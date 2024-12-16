const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorsRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.use((err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    if (err.message === 'Validation error: Validation isEmail on username failed') {
      res.status(403).json({ 
        error: 'Username has to be a valid email.',
      });
    } else if (err.message === 'Validation error: Validation min on year failed') {
      res.status(403).json({ 
        error: 'Blog year has to be 1991 or higher',
      });
    } else if (err.message === 'Validation error: Validation max on year failed') {
      res.status(403).json({ 
        error: 'Blog year can be by latest the current year',
      });
    } else {
      res.status(403).json({ 
        error: 'Failed to validate data',
        validationErrors: err.message,
      });
    }
  } else {
    console.error(err);
    res.status(500).json({ error: 'Whoopsie' });
  }
});

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()