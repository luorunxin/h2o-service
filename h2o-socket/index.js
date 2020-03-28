const Koa = require('koa')
const route = require('koa-route')
const kw = require('koa-websocket')
const config = require('../config/default.config')
const { getIPAdress } = require('../utils/util')

const app = kw(new Koa())

let clients = []

app.ws.use((ctx, next) => {
  return next(ctx);
});

app.ws.use(route.all('/service', ctx => {
  console.log('service',global.loginAuth)
  clients.push({ctx})
  // ctx.websocket.send('已连接');
  ctx.websocket.on('message', msg => {
    if(msg === '791618513') return
    if(!clients[clients.length-1].token) {
      clients[clients.length-1].token = JSON.parse(msg).token
    }
    for(let i in clients){
      if(clients[i].token == JSON.parse(msg).token) continue
      if(JSON.parse(msg).message) clients[i].ctx.websocket.send(JSON.parse(msg).message)
    }
  });
  ctx.websocket.on('close', msg => {
    for(let i in clients) {
      if(ctx == clients[i].ctx){
        console.log('关闭: '+clients[i].token)
        clients.splice(i, 1)
        break
      }
    }
  })
}));

app.listen(config.websocketPort, () => {
  console.log('%o 【 h2o-socket 】Server listening on: http://'+getIPAdress()+':'+config.websocketPort,'READY')
});