const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')

router.post('/addShoppingCart', async ctx => {
  ctx.request.body.phone = Util.getUserByToken(ctx.request.headers.access_token)
  await Service.addShoppingCart(ctx.request.body).then(res => {
    ctx.response.body = res
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getShoppingCartList', async ctx => {
  ctx.request.body.phone = Util.getUserByToken(ctx.request.headers.access_token)
  await Service.getShoppingCartList(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteShoppingCartById', async ctx => {
  ctx.request.body.phone = Util.getUserByToken(ctx.request.headers.access_token)
  await Service.deleteShoppingCartById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteShoppingCart', async ctx => {
  ctx.request.body.phone = Util.getUserByToken(ctx.request.headers.access_token)
  await Service.deleteShoppingCart(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/updateShoppingCartById', async ctx => {
  ctx.request.body.phone = Util.getUserByToken(ctx.request.headers.access_token)
  await Service.updateShoppingCartById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router