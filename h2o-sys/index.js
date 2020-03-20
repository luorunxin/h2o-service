const Koa = require('koa')
const http = require('http')
const https = require('https')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const config = require('../config/default.config')
const { getIPAdress } = require('../utils/util')
const routes = require('./controller')

const app = new Koa()

app.use(bodyParser())

app.use(cors(config.cors))

for(let k in routes){
  app.use(routes[k].routes()).use(routes[k].allowedMethods())
}

http.createServer(app.callback()).listen(config.sysPort, () => {
  console.log('%o 【 h2o-sys 】Server listening on: http://'+getIPAdress()+':'+config.sysPort,'READY')
})