const router = require('express').Router()
const { fn, col } = require('sequelize')
const { Blog } = require('../models')

router.get('/', async (req, res) => {  
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [fn('SUM', col('likes')), 'likes'],
      [fn('COUNT', col('author')), 'blogs']
    ],
    group: ['author'],
    order: [
      ['likes', 'DESC']
    ]    
  })
  res.json(blogs)
})

module.exports = router