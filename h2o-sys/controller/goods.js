const Router = require('koa-router')
const router = new Router()
const Goods = require('../service')

router.get('/', async ctx => {
  await Goods.getCategory().then(res => {
    ctx.response.body = res
  })
})

module.exports = router