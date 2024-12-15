const router = require('express').Router()

const { ReadingList } = require('../models')

router.post('/', async (req, res) => {  
  const { blogId, userId } = req.body;
  const readingList = await ReadingList.create({ 
    blogId, 
    userId
  });  
  res.json(readingList)  
})


module.exports = router