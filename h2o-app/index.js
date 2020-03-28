const Koa = require('koa')
const http = require('http')
const https = require('https')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const session = require('koa-session');
const config = require('../config/default.config')
const { getIPAdress } = require('../utils/util')
const routes = require('./controller')
const Jwt = require('../utils/jwt')

const app = new Koa()

app.keys = ['h2o session secret'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));

app.use(bodyParser())

app.use(cors(config.cors))

// app.use(Jwt.check())

for(let k in routes){
  app.use(routes[k].routes()).use(routes[k].allowedMethods())
}

http.createServer(app.callback()).listen(config.appPort, () => {
  console.log('%o 【 h2o-app 】Server listening on: http://'+getIPAdress()+':'+config.appPort,'READY')
})