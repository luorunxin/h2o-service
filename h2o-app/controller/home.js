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

module.exports = router