const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})
  
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
      const blog = await Blog.create(req.body)
      return res.json(blog)
  } catch(error) {
      return res.status(400).json({ error })
  }
})
  
router.delete('/:id', async (req, res) => {
  const removeBlog = await Blog.destroy({
  where: {
      id: req.params.id
  }
  })
    if (removeBlog) {
    return res.json({ message: `Blog with id ${req.params.id} was deleted` })
  } else {
    return res.status(404).json({ message: `Blog with id ${req.params.id} not found` })
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