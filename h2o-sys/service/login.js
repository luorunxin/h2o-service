const { query } = require('../../mysql/init')
const Util = require('../../utils/util')
const jwt = require('jsonwebtoken')

let loginAuth = []

let login = val => {
  return new Promise(async (resolve, reject) => {
    let checkLoginSql = `SELECT * FROM roles WHERE phone="${val.phone}" AND password="${val.password}";`
    await query(checkLoginSql).then(res => {
      if(res.length > 0){
        if(loginAuth.includes(res[0].phone)){
          reject(Util.setResult({},'此账号正在登陆中',412,null))
        }else{
          let user = {
            phone: res[0].phone,
            password: res[0].password,
            create_time: new Date()
          }
          res[0].access_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*30})
          res[0].refresh_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*30*2})
          resolve(res[0])
          loginAuth.push(res[0].phone)
        }
      }else{
        reject(Util.setResult({},'账号或密码错误',412,null))
      }
    }).catch(err => {reject(Util.setResult({},'服务端发生错误',500,err))})
  })
}

let logout = val => {
  return new Promise(resolve => {
    loginAuth.splice(loginAuth.indexOf(val.phone),1)
    resolve()
  })
}

let refreshToken = val => {
  return new Promise(async resolve => {
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
      loginAuth.splice(loginAuth.indexOf(val.phone), 1)
    }else{
      let user = {
        phone: val.phone,
        password: val.password,
        create_time: new Date()
      }
      let access_token = jwt.sign(user,Util.tokenSecret(),{expiresIn: 60*30})
      resolve(Util.setResult({access_token}))
    }
  })
}

module.exports = {
  login,
  logout,
  refreshToken
}