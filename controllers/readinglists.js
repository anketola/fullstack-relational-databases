const router = require('express').Router()

const { ReadingList } = require('../models')
const { tokenExtractor } = require('../util/tokenExtractor')

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
  
  if (selectedBlog.userId === req.decodedToken.id) {
    if (req.body.read === true) {
      selectedBlog.read = true
      await selectedBlog.save()      
    }
  }
  res.json(selectedBlog)

})


module.exports = router