const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')

router.post('/login', async ctx => {
  await Service.login(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = err
  })
})

router.post('/refreshToken', async ctx => {
  await Service.refreshToken(ctx.request.body).then(res => {
    ctx.response.body = res
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router