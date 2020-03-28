const { query } = require('../../mysql/init')
const Util = require('../../utils/util')
const jwt = require('jsonwebtoken')



let login = val => {
  return new Promise(async (resolve, reject) => {
    let flag = false
    for(let i in global.loginAuth){
      let err = await new Promise(reso => {
        jwt.verify(global.loginAuth[i], Util.tokenSecret(), (err,recoded) => {
          if(!err && recoded.phone==val.phone) {
            reso(true)
          }
        })
      })
      if(err){
        flag = true
        break
      }
    }
    if(flag){
      resolve(Util.setResult({},'此账号正在登陆中',412,null))
      return
    }
    let checkLoginSql = `SELECT * FROM roles WHERE phone="${val.phone}" AND password="${val.password}";`
    await query(checkLoginSql).then(async res => {
      if(res.length > 0){
        let selectDutySql = `SELECT * FROM dutes WHERE id=${res[0].duty_id};`
        await query(selectDutySql).then(async duty => {
          res[0].duty = duty[0]
          let selectPermissionsSql = `SELECT * FROM permissions WHERE id in (${duty[0].permission_id});`
          await query(selectPermissionsSql).then(ps => {
            res[0].permissions = ps
          }).catch(err => {reject(err)})
        }).catch(err => {reject(err)})
        let user = {
          phone: res[0].phone,
          password: res[0].password
        }
        res[0].access_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*15})
        res[0].refresh_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*15*2})
        resolve(Util.setResult(res[0]))
        global.loginAuth.push(res[0].access_token)
      }else{
        resolve(Util.setResult({},'账号或密码错误',412,null))
      }
    }).catch(err => {reject(err)})
  })
}

let logout = val => {
  return new Promise(async (resolve) => {
    for(let i in global.loginAuth){
      let err = await new Promise(re => {
        jwt.verify(global.loginAuth[i], Util.tokenSecret(), (err,recoded) => {
          if(!err && recoded.phone==val.phone) {
            global.loginAuth.splice(i,1);
            re(true)
          }
        })
      })
      if(err){
        break
      }
    }
    resolve(Util.setResult({},'请重新登陆!',401,null))
  })
}

let refreshToken = val => {
  return new Promise(async resolve => {
    if(!global.post) {
      resolve(Util.setResult({},'请重新登陆！',401, null))
      global.post = true
      return
    }
    let err = await new Promise(resolve => {
      jwt.verify(val.refresh_token, Util.tokenSecret(), (err) => {
        if(err) {
          resolve(true)
        }else{
          resolve(false)
        }
      })
    })
    if(err) {
      resolve(Util.setResult({},'请重新登陆！',401,err))
    }else{
      let user = {
        phone: val.phone,
        password: val.password,
      }
      let access_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*15})
      resolve(Util.setResult({access_token}))
    }
  })
}

module.exports = {
  login,
  logout,
  refreshToken
}