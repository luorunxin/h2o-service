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
        let selectDutyByPermissionIdSql = `SELECT * FROM dutes WHERE permission_id LIKE "%${val.id}%"`
        await query(selectDutyByPermissionIdSql).then(async res => {
          if(res.length>0){
            reject(Util.setResult({},'该权限已在职务中使用，操作失败',412))
          }else{
            let deletePermissionSql = `DELETE FROM permissions WHERE id=${val.id};`
            await query(deletePermissionSql).then(res => {resolve()}).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
          }
        }).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
      }
    }).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
  })
}

let addUpdateDuty = val => {
  return new Promise(async (resolve, reject) => {
    if(!val.id){
      let insertDutySql = `INSERT INTO dutes (duty_name,permission_id,create_time) VALUES ("${val.duty_name}","${val.permission_id}",NOW())`
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
        let permission_id = []
        let selectPermissionsSql = `SELECT * FROM permissions WHERE id in (${res[i].permission_id});`
        await query(selectPermissionsSql).then(res => {
          for(let k in res) {
            permission_id.push(res[k].label)
          }
        }).catch(err => {reject(err)})
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
      // let permission_id = []
      // let array = []
      let permission_id = res[0].permission_id.split(',').map(item => {return parseInt(item)})
      // for(let i in permission_id) {
      //   let selectPermissionSql = `SELECT * FROM permissions WHERE parent_id=${permission_id[i]};`
      //   await query(selectPermissionSql).then(res => {
      //     if(res.length<1){
      //       array.push(permission_id[i])
      //     }
      //   }).catch(err => {reject(err)})
      // }
      res[0].permission_id = permission_id
      resolve(res[0])
    }).catch(err => {reject(err)})
  })
}

let deleteDutyById = val => {
  return new Promise(async (resolve, reject) => {
    let selectRoleByDutyIdSql = `SELECT * FROM roles WHERE duty_id=${val.id};`
    await query(selectRoleByDutyIdSql).then(async res => {
      if(res.length>0){
        reject(Util.setResult({},'该职务已在角色中使用，操作失败',412))
      }else{
        let deleteDutyByIdSql = `DELETE FROM dutes WHERE id=${val.id};`
        await query(deleteDutyByIdSql).then(res => {
          resolve()
        }).catch(err => {Util.setResult({},'服务端发生错误',500,err)})
      }
    }).catch(err => {Util.setResult({},'服务端发生错误',500,err)})
  })
}

let addUpdateRole = val => {
  return new Promise(async (resolve, reject) => {
    if(!val.id){
      let selectRoleByPhoneSql = `SELECT * FROM roles WHERE phone="${val.phone}";`
      await query(selectRoleByPhoneSql).then(async res => {
        if(res.length>0){
          resolve(Util.setResult({},'手机号已存在！',500,null))
        }else{
          let insertRoleSql = `INSERT INTO roles (name,gender,phone,password,duty_id,create_time) VALUES ("${val.name}",${val.gender},"${val.phone}","${val.password}",${val.duty_id},NOW());`
          await query(insertRoleSql).then(res => {
            resolve(Util.setResult({},'角色添加成功',200,null))
          }).catch(err => {reject(err)})
        }
      }).catch(err => {reject(err)})
    }else{
      let updateRoleSql = `UPDATE roles SET name="${val.name}",gender=${val.gender},phone="${val.phone}",password="${val.password}",duty_id=${val.duty_id} WHERE id=${val.id};`
      await query(updateRoleSql).then(res => {
        resolve(Util.setResult({},'角色修改成功！',200,null))
      }).catch(err => {reject(err)})
    }
  })
}

let deleteRoleById = val => {
  return new Promise((resolve,reject) => {
    let deleteRoleByIdSql = `DELETE FROM roles WHERE id=${val.id};`
    query(deleteRoleByIdSql).then(res => {resolve()}).catch(err => {reject(err)})
  })
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
          let permission_id = []
          let selectPermissionsSql = `SELECT * FROM permissions WHERE id in (${dutys.permission_id});`
          await query(selectPermissionsSql).then(permissions => {
            for(let k in permissions) {
              permission_id.push(permissions[k].label)
            }
          }).catch(err => {reject(err)})
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