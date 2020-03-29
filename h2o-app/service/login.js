const { query } = require('../../mysql/init')
const { CATEGORY } = require('../../utils/enum')
const Util = require('../../utils/util')
const jwt = require('jsonwebtoken')

let login = val => {
  return new Promise(async (resolve, reject) => {
    if(val.code != '000000'){
      reject(Util.setResult({},'验证码错误',412,null))
      return
    }
    for(let i in global.users){
      jwt.verify(global.users[i], Util.tokenSecret(), (err, recoded) => {
        if(!err && recoded.phone == val.phone) {
          global.users.splice(i,1)
        }
      })
    }
    // let err = await new Promise(resol => {
    //   for(let i in global.users){
    //     jwt.verify(global.users[i], Util.tokenSecret(), (err, recoded) => {
    //       if(!err && recoded.phone == val.phone) {
    //         resol(true)
    //       }else{
    //         resol(false)
    //       }
    //     })
    //   }
    // })
    // if(err) {
    //   reject(Util.setResult({},'此账号正在登陆中',412,null))
    //   return
    // }
    let selectUserByPhoneSql = `SELECT * FROM user WHERE phone="${val.phone}";`
    let id = Util.uuid()
    await query(selectUserByPhoneSql).then(res => {
      if(res.length > 0){
        id = res[0].id
      }
    }).catch(err => reject(Util.setResult({},'服务器发生错误',500,err)))
    let loginSql = `INSERT INTO user (id,phone,login_time) VALUES ("${id}","${val.phone}",NOW());`
    await query(loginSql).then(res => {
      let user = {
        phone: val.phone
      }
      user.access_token = jwt.sign(user, Util.tokenSecret(), {expiresIn: 60*60*24*7})
      user.refresh_token = jwt.sign(user, Util.tokenSecret(), {expiresIn: 60*60*24*14})
      resolve(user)
      global.users.push(user.access_token)
    }).catch(err => reject(Util.setResult({},'服务器发生错误',500,err)))
  })
}

let refreshToken = val => {
  return new Promise(async (resolve, reject) => {
    if(!global.user_post) {
      reject(Util.setResult({},'请重新登陆！',401, null))
      global.user_post = true
      return
    }
    let phone = ''
    let err = await new Promise(reso => {
      jwt.verify(val.refresh_token, Util.tokenSecret(), (err,recoded) => {
        if(err){
          reso(true)
        }else{
          phone = recoded.phone
          reso(false)
        }
      })
    })
    if(err){
      reject(Util.setResult({},'请重新登陆',401,null))
      return
    }
    for(let i in global.users){
      jwt.verify(global.users[i], Util.tokenSecret(), (err,recoded) => {
        if(!err && recoded.phone == phone){
          global.users.splice(i,1)
        }
      })
    }
    let user = {
      phone
    }
    let access_token = jwt.sign(user, Util.tokenSecret(), {expiresIn: 60*60*24*7})
    global.users.push(access_token)
    resolve(access_token)
  })
}

let logout = val => {
  return new Promise(async (resolve) => {
    let phone = ''
    jwt.verify(val.access_token, Util.tokenSecret(), (err,recoded) => {
      if(!err){
        phone = recoded.phone
      }
    })
    for(let i in global.users){
      let err = await new Promise(resolve1 => {
        jwt.verify(global.users[i], Util.tokenSecret(), (err,recoded) => {
          if(!err && recoded.phone == phone){
            global.users.splice(i,1)
            resolve1(true)
          }else{
            resolve1(false)
          }
        })
      })
      if(err){
        break
      }
    }
    resolve()
  })
}

module.exports = {
  login,
  refreshToken,
  logout
}