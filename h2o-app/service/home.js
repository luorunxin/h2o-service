const { query } = require('../../mysql/init')
const { CATEGORY } = require('../../utils/enum')
const Util = require('../../utils/util')

let goodsList = val => {
  return new Promise(async (resolve, reject) => {
    let {page,size} = val
    page = (page-1)*size
    let selectGoodsSql = `SELECT * FROM goods order by create_time desc limit ${page},${size};`
    await query(selectGoodsSql).then(async res => {
      for(let i in res){
        res[i].payment_number = 100
        res[i].monthly_sales = 1000
        let selectGoodsImagesSql = `SELECT * FROM goods_images WHERE goods_id="${res[i].id}";`
        await query(selectGoodsImagesSql).then(images => {
          res[i].src = images[0].src
        }).catch(err => {
          reject(err)
        })
      }
      let selectCountGoodsSql = `SELECT count(*) FROM goods;`
      await query(selectCountGoodsSql).then(total => {
        resolve(Util.setResult(res,'ok',200,null,total[0]["count(*)"]))
      }).catch(err => reject(err))
    }).catch(err => {
      reject(err)
    })
  })
}

let getGoodsById = val => {
  return new Promise(async (resolve, reject) => {
    let selectGoodsSql = `SELECT * FROM goods WHERE id="${val.id}";`
    await query(selectGoodsSql).then(async res => {
      res = res[0]
      res.payment_number = 100
      res.monthly_sales = 1000
      let selectGoodsImagesSql = `SELECT * FROM goods_images WHERE goods_id="${val.id}";`
      await query(selectGoodsImagesSql).then(images => {
        res.images = images
      }).catch(err => {
        reject(err)
      })
      let selectGoodsAmountsSql = `SELECT * FROM goods_amount WHERE goods_id="${val.id}";`
      await query(selectGoodsAmountsSql).then(amounts => {
        res.amounts = amounts
      }).catch(err => {
        reject(err)
      })
      let selectGoodsTypesSql = `SELECT * FROM goods_type WHERE goods_id="${val.id}";`
      await query(selectGoodsTypesSql).then(type => {
        res.type = type
      }).catch(err => {
        reject(err)
      })
      resolve(res)
    }).catch(err => reject(err))
  })
}

module.exports = {
  goodsList,
  getGoodsById
}