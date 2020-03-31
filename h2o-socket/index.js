const Koa = require('koa')
const route = require('koa-route')
const kw = require('koa-websocket')
const config = require('../config/default.config')
const { getIPAdress } = require('../utils/util')

const app = kw(new Koa())

let clients = [],service = [],ongoing = []

app.ws.use((ctx, next) => {
  return next(ctx);
});

app.ws.use(route.all('/service', async ctx => {
  ctx.websocket.on('message', msg => {
    if(msg === '791618513') return
    msg = JSON.parse(msg)
    if(msg.type === 'user'){
      let flag = true
      for(let c in clients){
        if(clients[c].access_token === msg.access_token){
          flag = false
          break
        }
      }
      for(let o in ongoing){
        if(ongoing[o].user.access_token === msg.access_token){
          flag = false
          break
        }
      }
      if(flag){
        msg.ctx = ctx
        clients.push(msg)
      }
      if(msg.message){
        let isGoing = true
        for(let o in ongoing){
          if(ongoing[o].user.access_token === msg.access_token){
            ongoing[o].service.ctx.websocket.send(JSON.stringify(msg))
            isGoing = false
            flag = true
            break
          }
        }
        if(isGoing){
          if(service.length>0){
            for(let s in service){
              service[s].ctx.websocket.send(JSON.stringify(msg))
              flag = true
            }
          }else{
            for(let o in ongoing){
              ongoing[o].service.ctx.websocket.send(JSON.stringify(msg))
              flag = true
            }
          }
        }
      }
    }else{
      let flag = true
      for(let s in service){
        if(service[s].access_token === msg.access_token){
          flag = false
          break
        }
      }
      for(let o in ongoing){
        if(ongoing[o].service.access_token === msg.access_token){
          flag = false
          break
        }
      }
      if(flag){
        msg.ctx = ctx
        service.push(msg)
      }
      if(msg.message){
        let isGoing = true
        for(let o in ongoing){
          if(ongoing[o].service.access_token === msg.access_token){
            ongoing[o].user.ctx.websocket.send(msg.message)
            isGoing = false
            flag = true
            break
          }
        }
        if(isGoing){
          for(let c in clients){
            if(clients[c].access_token === msg.user.access_token){
              for(let s in service){
                if(service[s].phone === msg.phone){
                  let obj = {
                    user: clients[c],
                    service: service[s]
                  }
                  ongoing.push(obj)
                  clients[c].ctx.websocket.send(msg.message)
                  clients.splice(c,1)
                  service.splice(s,1)
                  flag = true
                  break
                }
              }
              break
            }
          }
          for(let s in service){
            service[s].ctx.websocket.send(JSON.stringify({
              isMatching:true,
              phone: msg.user.phone
            }))
          }
        }
      }
    }
  });
  ctx.websocket.on('close', msg => {
    let flag = false
    for(let i in clients) {
      if(ctx == clients[i].ctx){
        console.log('未连接用户: '+clients[i].phone+'关闭')
        for(let s in service){
          service[s].ctx.websocket.send(JSON.stringify({
            isMatching:true,
            phone: clients[i].phone
          }))
        }
        clients.splice(i, 1)
        flag = true
        break
      }
    }
    if(flag) return
    for(let i in service) {
      if(ctx == service[i].ctx){
        console.log('未连接客服: '+service[i].phone+'关闭')
        service.splice(i, 1)
        flag = true
        break
      }
    }
    if(flag) return
    for(let i in ongoing) {
      if(ctx == ongoing[i].user.ctx){
        console.log('连接用户: '+ongoing[i].user.phone+'关闭')
        service.push(ongoing[i].service)
        for(let s in service){
          service[s].ctx.websocket.send(JSON.stringify({
            isMatching:true,
            phone: ongoing[i].user.phone
          }))
        }
        ongoing.splice(i, 1)
        break
      }
      if(ctx == ongoing[i].service.ctx){
        console.log('连接客服: '+ongoing[i].service.phone+'关闭')
        clients.push(ongoing[i].user)
        ongoing.splice(i, 1)
        break
      }
    }
  })
}));

app.listen(config.websocketPort, () => {
  console.log('%o 【 h2o-socket 】Server listening on: http://'+getIPAdress()+':'+config.websocketPort,'READY')
});