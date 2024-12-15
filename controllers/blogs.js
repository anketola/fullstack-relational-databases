const router = require('express').Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { tokenExtractor } = require('../util/tokenExtractor')

router.get('/', async (req, res) => {
  const where = {}
  
  if (req.query.search) {
    where[Op.or] = [
      { 
        title: {
          [Op.iLike]: `%${req.query.search}%` 
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%` 
      }
      }
    ]      
  }  

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'name', 'username']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})
  
router.post('/', tokenExtractor, async (req, res) => {
  console.log(req.body)
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({...req.body, userId: user.id})  
  return res.json(blog)  
})
  
router.delete('/:id', tokenExtractor, async (req, res) => {
  const blogToRemove = await Blog.findByPk(req.params.id)
  if (!blogToRemove) {
    return res.status(404).json({ message: `Blog with id ${req.params.id} not found` })
  }
  if (blogToRemove.userId === req.decodedToken.id) {
    await blogToRemove.destroy()
    return res.json({ message: `Blog with id ${req.params.id} was deleted` })
  } else {
    return res.status(403).json({ message: 'Not authorized' });
  }
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    blog.likes = req.body.likes
    await blog.save()
    res.json({likes: blog.likes})
  } else {
    res.status(404).end()
  }
})

module.exports = router