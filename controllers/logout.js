const router = require('express').Router()

const { removeUserSessions } = require('../util/authUtils')
const { tokenExtractor } = require('../util/tokenExtractor')

router.delete('/', tokenExtractor, async (req, res) => {
  await removeUserSessions(req.decodedToken.id)
  return res.status(200).json({ message: 'User logged out and all sessions removed'})
})

module.exports = router