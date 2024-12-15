require('dotenv').config()

module.exports = {
  SECRET: process.env.SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
}