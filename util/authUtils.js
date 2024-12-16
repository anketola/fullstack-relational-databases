const { User, Session } = require('../models')

const userAccountActive = async (id) => {
  const user = await User.findByPk(id, {
    attributes: ['disabled']
  })
  if (!user) {
      return false
  }
  return !user.disabled
}

const storeSession = async (id, token) => {
  await Session.create({
    userId: id,
    token: token
  })
}

const userHasSession = async (id, token) => {
  const session = await Session.findOne({
    where: {
      userId: id,
      token: token
    }
  })
  if (session) {
    return true
  }
  return false
}

const removeUserSessions = async (id) => {
  await Session.destroy({
    where: {
      userId: id
    }
  })
}

module.exports = {
  userAccountActive,
  storeSession,
  userHasSession,
  removeUserSessions
}