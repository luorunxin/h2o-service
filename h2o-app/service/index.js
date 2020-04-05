const Home = require('./home')
const Login = require('./login')
const ShoppingCart = require('./shoppingCart')

module.exports = {
  ...Home,
  ...Login,
  ...ShoppingCart,
}