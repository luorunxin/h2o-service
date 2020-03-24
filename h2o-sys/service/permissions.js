const { query } = require('../../mysql/init')
const Util = require('../../utils/util')

let getPermissionsList = val => {
  return new Promise(async (resolve, reject) => {
    let getPermissionsListSql = `SELECT * FROM permissions;`
    await query(getPermissionsListSql).then(res => {
      resolve({
        start_id: res.length+1,
        data:Util.setPermissionsToArray(res)
      })
    }).catch(err => {reject(err)})
  })
}

let insertPermission = val => {
  return new Promise(async (resolve, reject) => {
    let deletePermissionsSql = `DELETE FROM permissions;`
    await query(deletePermissionsSql).then(res => {}).catch(err => {reject(err)})
    let arr = [], str = ''
    Util.setPermissions(val, arr)
    for(let i in arr) {
      if(i == arr.length-1){
        str+=`(${arr[i].id},"${arr[i].label}","${arr[i].identify}",${arr[i].parent_id})`
      }else{
        str+=`(${arr[i].id},"${arr[i].label}","${arr[i].identify}",${arr[i].parent_id}),`
      }
    }
    let insertPermissionSql = `INSERT INTO permissions (id,label,identify,parent_id) VALUES ${str};`
    await query(insertPermissionSql).then(res => {}).catch(err => {reject(err)})
    resolve()
  })
}

let deletePermissionById = val => {
  return new Promise(async (resolve, reject) => {
    let selectPermissionSql = `SELECT * FROM permissions WHERE parent_id=${val.id};`
    await query(selectPermissionSql).then(async res => {
      if(res.length>0){
        reject(Util.setResult({},'该权限存在子级，操作失败',412))
      }else{
        let deletePermissionSql = `DELETE FROM permissions WHERE id=${val.id};`
        await query(deletePermissionSql).then(res => {resolve()}).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
      }
    }).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
  })
}

let addUpdateDuty = val => {
  return new Promise(async (resolve, reject) => {
    if(!val.id){
      let insertDutySql = `INSERT INTO dutes (duty_name,permission_id,create_time) VALUES ("${val.duty_name}","${val.permission_id}",NOW());`
      await query(insertDutySql).then(res => {}).catch(err => {reject(err)})
    }else{
      let updateDutySql = `UPDATE dutes SET duty_name="${val.duty_name}",permission_id="${val.permission_id}" WHERE id=${val.id};`
      await query(updateDutySql).then(res => {}).catch(err => {reject(err)})
    }
    resolve()
  })
}

let getDutes = val => {
  return new Promise(async (resolve, reject) => {
    let {page,size} = val
    page = (page-1)*size
    let getDutesSql = `SELECT * FROM dutes order by id desc limit ${page},${size};`
    await query(getDutesSql).then(async res => {
      for(let i in res) {
        let permission_ids = res[i].permission_id.split(','),permission_id = []
        for(let n in permission_ids) {
          let selectPermissionByIdSql = `SELECT * FROM permissions WHERE id=${permission_ids[n]}`
          await query(selectPermissionByIdSql).then(res => {
            permission_id.push(res[0].label)
          }).catch(err => {reject(err)})
        }
        res[i].permission_id = permission_id.join('，')
      }
      resolve(res)
    }).catch(err => {reject(err)})
  })
}

let getDutyById = val => {
  return new Promise(async (resolve, reject) => {
    let getDutyByIdSql = `SELECT * FROM dutes WHERE id=${val.id};`
    await query(getDutyByIdSql).then(async res => {
      let permission_id = []
      let array = []
      permission_id = res[0].permission_id.split(',').map(item => {return parseInt(item)})
      for(let i in permission_id) {
        let selectPermissionSql = `SELECT * FROM permissions WHERE parent_id=${permission_id[i]};`
        await query(selectPermissionSql).then(res => {
          if(res.length<1){
            array.push(permission_id[i])
          }
        }).catch(err => {reject(err)})
      }
      res[0].permission_id = array
      resolve(res[0])
    }).catch(err => {reject(err)})
  })
}

let deleteDutyById = val => {
  let deleteDutyByIdSql = `DELETE FROM dutes WHERE id=${val.id};`
  return query(deleteDutyByIdSql)
}

let addUpdateRole = val => {
  return new Promise(async (resolve, reject) => {
    if(!val.id){
      let insertRoleSql = `INSERT INTO roles (name,gender,phone,duty_id,create_time) VALUES ("${val.name}",${val.gender},"${val.phone}",${val.duty_id},NOW());`
      await query(insertRoleSql).then(res => {}).catch(err => {reject(err)})
    }else{
      let updateRoleSql = `UPDATE roles SET name="${val.name}",gender=${val.gender},phone="${val.phone}",duty_id=${val.duty_id} WHERE id=${val.id};`
      await query(updateRoleSql).then(res => {}).catch(err => {reject(err)})
    }
    resolve()
  })
}

let deleteRoleById = val => {
  let deleteRoleByIdSql = `DELETE FROM roles WHERE id=${val.id};`
  return query(deleteRoleByIdSql)
}

let getRoleList = val => {
  return new Promise(async (resolve, reject) => {
    let {page,size} = val
    page = (page-1)*size
    let getRoleListSql = `SELECT * FROM roles order by id desc limit ${page},${size};`
    await query(getRoleListSql).then(async res => {
      for(let i in res) {
        let getDutyByIdSql = `SELECT * FROM dutes WHERE id=${res[i].duty_id};`
        await query(getDutyByIdSql).then(dutys => {
          res[i].duty = dutys[0].duty_name
          return dutys[0]
        }).then(async dutys => {
          let permission_ids = dutys.permission_id.split(','),permission_id = []
          for(let n in permission_ids) {
            let selectPermissionByIdSql = `SELECT * FROM permissions WHERE id=${permission_ids[n]}`
            await query(selectPermissionByIdSql).then(permissions => {
              permission_id.push(permissions[0].label)
            }).catch(err => {reject(err)})
          }
          res[i].permission = permission_id.join('，')
        }).catch(err => {reject(err)})
      }
      resolve(res)
    }).catch(err => {reject(err)})
  })
}

let getRoleById = val => {
  return new Promise(async (resolve, reject) => {
    let getRoleByIdSql = `SELECT * FROM roles WHERE id=${val.id}`
    await query(getRoleByIdSql).then(res => {resolve(res[0])}).catch(err => {reject(err)})
  })
}

module.exports = {
  getPermissionsList,
  insertPermission,
  deletePermissionById,
  addUpdateDuty,
  getDutes,
  getDutyById,
  deleteDutyById,
  addUpdateRole,
  deleteRoleById,
  getRoleList,
  getRoleById
}