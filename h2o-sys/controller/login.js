const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')
const jwt = require('jsonwebtoken')

global.loginAuth = []
global.post = true

router.post('/login', async ctx => {
  await Service.login(ctx.request.body).then(res => {
    if(global.loginAuth && global.loginAuth.includes(res.result.access_token)){
      ctx.response.body = Util.setResult({},'此账号正在登陆中',412,null)
    }else {
      ctx.response.body = res
      if(res.result && res.result.access_token) {
        global.loginAuth.push(res.result.access_token)
      }
    }
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/logout', ctx => {
  global.loginAuth.splice(global.loginAuth.indexOf(ctx.request.headers.access_token),1)
  ctx.response.body = Util.setResult({},'请重新登陆！',401,null)
  // await Service.refreshToken(ctx.request.body).then(res => {
  //   ctx.response.body = Util.setResult(res)
  // }).catch(err => {
  //   ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  // })
})

router.post('/refreshToken', async ctx => {
  await Service.refreshToken(ctx.request.body).then(res => {
    ctx.response.body = res
    global.loginAuth.splice(global.loginAuth.indexOf(ctx.request.headers.access_token),1)
    global.loginAuth.push(res.result.access_token)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteRoleById', async ctx => {
  await Service.getRoleById(ctx.request.body).then(role => {
    for(let i in global.loginAuth) {
      jwt.verify(global.loginAuth[i], Util.tokenSecret(), (err, recoded) => {
        if (!err && recoded.phone == role.phone) {
          global.loginAuth.splice(i, 1)
        }
      })
    }
  })
  await Service.deleteRoleById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router