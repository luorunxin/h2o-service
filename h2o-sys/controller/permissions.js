const Router = require('koa-router')
const router = new Router()
const Service = require('../service')
const Util = require('../../utils/util')

router.post('/getPermissionsList', async ctx => {
  await Service.getPermissionsList().then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/insertPermission', async ctx => {
  await Service.insertPermission(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deletePermissionById', async ctx => {
  await Service.deletePermissionById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = err
  })
})

router.post('/addUpdateDuty', async ctx => {
  await Service.addUpdateDuty(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getDutes', async ctx => {
  await Service.getDutes(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getDutyById', async ctx => {
  await Service.getDutyById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteDutyById', async ctx => {
  await Service.deleteDutyById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = err
  })
})

router.post('/addUpdateRole', async ctx => {
  await Service.addUpdateRole(ctx.request.body).then(res => {
    ctx.response.body = res
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/deleteRoleById', async ctx => {
  await Service.deleteRoleById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getRoleList', async ctx => {
  await Service.getRoleList(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

router.post('/getRoleById', async ctx => {
  await Service.getRoleById(ctx.request.body).then(res => {
    ctx.response.body = Util.setResult(res)
  }).catch(err => {
    ctx.response.body = Util.setResult({},'服务端发生错误',500,err)
  })
})

module.exports = router