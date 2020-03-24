const Goods = require('./goods')
const Permissions = require('./permissions')

module.exports = {
  ...Goods,
  ...Permissions
}