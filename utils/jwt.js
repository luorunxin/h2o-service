const Jwt = require('jsonwebtoken')
const Util = require('./util')

module.exports = {
  check: () => {
    return async (ctx,next) => {
      if(Util.tokenWhiteUrl().includes(ctx.request.url)){
        await next()
      }else{
        if(global.loginAuth && !global.loginAuth.includes(ctx.request.headers.access_token)){
          global.post = false
          ctx.response.status = 401
          ctx.response.body = Util.setResult({},'请重新登陆！',401,null)
          return
        }
        let access_token = ctx.request.headers.access_token
        let secret = Util.tokenSecret()
        let access = await new Promise(resolve => {
          Jwt.verify(access_token, secret, (err) => {
            if(err) {
              resolve(true)
            }else{
              resolve(false)
            }
          })
        })
        if(access) {
          ctx.response.status = 401
          ctx.response.body = Util.setResult({},'请重新登陆！',401,null)
          return
        }
        await next()
      }
    }
  }
}