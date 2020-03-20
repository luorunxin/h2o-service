module.exports = {

  // websocket port
  websocketPort: 3001,

  // app port
  appPort: 3002,

  // sys port
  sysPort: 3003,

  // 跨域配置
  cors: {
    origin: function (ctx) {
      return ctx.request.header.origin; // 允许来自所有域名请求
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  },

  // 数据库配置
  database: {
    DATABASE: 'h2o',
    USERNAME: 'root',
    PASSWORD: '123456',
    PORT: '3306',
    HOST: 'localhost'
  }

}