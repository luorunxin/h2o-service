const Router = require('koa-router')
const router = new Router()
const Goods = require('../service')
const Util = require('../../utils/util')

router.post('/goodsList', async ctx => {
  await Goods.goodsList(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/saveGoods', async ctx => {
  await Goods.saveGoods(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getCategoryList', async ctx => {
  await Goods.getCategoryList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getTypesList', async ctx => {
  await Goods.getTypesList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router