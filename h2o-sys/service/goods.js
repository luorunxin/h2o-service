const { query } = require('../../mysql/init')

let getCategory = val => {
  let sql = 'SELECT * FROM goods_category'
  return query(sql)
}

module.exports = {
  getCategory
}