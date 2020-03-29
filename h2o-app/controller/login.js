const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')

global.users = []
global.user_post = true

router.post('/login', async ctx => {
  await Service.login(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    // if(err.status == 401) ctx.response.status = 401
    ctx.response.body = err
  })
})

router.post('/refreshToken', async ctx => {
  await Service.refreshToken(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    // if(err.status == 401) ctx.response.status = 401
    ctx.response.body = err
  })
})

router.post('/logout', async ctx => {
  await Service.logout(ctx.request.headers).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    // if(err.status == 401) ctx.response.status = 401
    ctx.response.body = err
  })
})

module.exports = router