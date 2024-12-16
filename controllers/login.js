const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const { userAccountActive, storeSession } = require('../util/authUtils')

router.post('/', async (request, response) => {
  
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })
  const isActive = await userAccountActive(user.id)
  if (!isActive) {
    return response.status(403).json({ message: 'The account has been disabled'})
  }

  const passwordCorrect = body.password === 'salainen'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  await storeSession(user.id, token)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router