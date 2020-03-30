const { query } = require('../../mysql/init')
const Util = require('../../utils/util')

let getUserList = val => {
  return new Promise(async (resolve, reject) => {
    let {page,size} = val
    page = (page-1)*size
    let selectUserListSql = `SELECT * FROM user order by login_time desc limit ${page},${size};`
    await query(selectUserListSql).then(async res => {
      let selectCountUserSql = `SELECT count(*) FROM user;`
      await query(selectCountUserSql).then(total => {
        resolve(Util.setResult(res,'ok',200,null,total[0]["count(*)"]))
      }).catch(err => reject(err))
    }).catch(err => reject(err))
  })
}

module.exports = {
  getUserList,
}