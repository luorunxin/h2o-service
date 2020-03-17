const Koa = require('koa')
const http = require('http')
const https = require('https')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const { getIPAdress } = require('../../utils/util')
const whiteList = require('../../utils/whiteList')
require('../../h2o-socket/index')

const app = new Koa()
const router = new Router()

app.use(bodyParser())

app.use(cors({
  origin: function (ctx) {
    console.log('请求Origin: ',ctx.request.header.origin)
    return ctx.request.header.origin; // 允许来自所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(router.routes())

router.get('/', async (ctx, next) => {
  ctx.response.body = '收到'
})

router.post('/post', async (ctx, next) => {
  ctx.response.body = ctx
  console.log(ctx.request.body)
})

let port = 3002

let address = 'http://'+getIPAdress()+':'+port

http.createServer(app.callback()).listen(port, () => {
  console.log('%o HttpServer listening on: '+ address,'READY')
})

