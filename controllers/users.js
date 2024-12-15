const router = require('express').Router()

const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({    
    include: {
      model: Blog
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const userData = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      as: 'userReadings',
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      through: {
        attributes: []
      }
    },
    
  })
  res.json(userData)
})

router.post('/', async (req, res) => {  
  const user = await User.create(req.body)
  res.json(user)  
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  if (user) {
    user.name = req.body.name
    await user.save()
    res.json({name: user.name})    
  } else {
    res.status(404).end()
  }
})

module.exports = router