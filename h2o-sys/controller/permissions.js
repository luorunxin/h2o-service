const Router = require('koa-router')
const router = new Router()
const Goods = require('../service')
const Util = require('../../utils/util')

router.post('/getPermissionsList', async ctx => {
  await Goods.getPermissionsList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/insertPermission', async ctx => {
  await Goods.insertPermission(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deletePermissionById', async ctx => {
  await Goods.deletePermissionById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = err
  })
})

router.post('/addUpdateDuty', async ctx => {
  await Goods.addUpdateDuty(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getDutes', async ctx => {
  await Goods.getDutes(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getDutyById', async ctx => {
  await Goods.getDutyById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteDutyById', async ctx => {
  await Goods.deleteDutyById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/addUpdateRole', async ctx => {
  await Goods.addUpdateRole(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteRoleById', async ctx => {
  await Goods.deleteRoleById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getRoleList', async ctx => {
  await Goods.getRoleList(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getRoleById', async ctx => {
  await Goods.getRoleById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router