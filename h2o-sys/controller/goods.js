const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')

router.post('/goodsList', async ctx => {
  await Service.goodsList(ctx.request.body).then(res => {
    ctx.response.body = res
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/saveGoods', async ctx => {
  await Service.saveGoods(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getCategoryList', async ctx => {
  await Service.getCategoryList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getTypesList', async ctx => {
  await Service.getTypesList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getGoodsById', async ctx => {
  await Service.getGoodsById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteGoodsById', async ctx => {
  await Service.deleteGoodsById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router