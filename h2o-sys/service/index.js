const Goods = require('./goods')
const Permissions = require('./permissions')
const Login = require('./login')

module.exports = {
  ...Goods,
  ...Permissions,
  ...Login
}