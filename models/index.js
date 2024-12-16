const Blog = require('./blog')
const User = require('./user')
const Session = require('./session')
const ReadingList = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'userReadings' })
Blog.belongsToMany(User, { through: ReadingList })

User.hasMany(Session)
Session.belongsTo(User)

module.exports = {
  Blog, User, ReadingList, Session
}