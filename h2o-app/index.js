const Koa = require('koa')
const http = require('http')
const https = require('https')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const config = require('../config/default.config')
const { getIPAdress } = require('../utils/util')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

app.use(cors(config.cors))

app.use(router.routes()).use(router.allowedMethods())

router.get('/', async (ctx, next) => {
  ctx.response.body = '收到'
})

router.post('/post', async (ctx, next) => {
  ctx.response.body = ctx
  console.log(ctx.request.body)
})

http.createServer(app.callback()).listen(config.appPort, () => {
  console.log('%o 【 h2o-app 】Server listening on: http://'+getIPAdress()+':'+config.appPort,'READY')
})