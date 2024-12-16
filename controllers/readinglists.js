const router = require('express').Router()

const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/tokenExtractor')
const { userAccountActive, userHasSession } = require('../util/authUtils')

router.post('/', async (req, res) => {  
  const { blogId, userId } = req.body;
  const readingList = await ReadingList.create({ 
    blogId, 
    userId
  });  
  res.json(readingList)  
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const selectedBlog = await ReadingList.findByPk(req.params.id)
  const isActive = await userAccountActive(req.decodedToken.id)
  if (!isActive) {
    return res.status(403).json({ message: 'The account has been disabled'})
  }
  const session = await userHasSession(req.decodedToken.id, req.token)
  if (!session) {
    return res.status(401).json({ message: 'Invalid session or token'})
  }
  if (selectedBlog.userId === req.decodedToken.id) {
    if (req.body.read === true) {
      selectedBlog.read = true
      await selectedBlog.save()      
    }
  }
  res.json(selectedBlog)

})

module.exports = router