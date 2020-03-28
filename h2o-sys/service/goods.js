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
          res[i].images = images
        }).catch(err => {
          reject(err)
        })
        let selectGoodsAmountsSql = `SELECT * FROM goods_amount WHERE goods_id="${res[i].id}";`
        await query(selectGoodsAmountsSql).then(amounts => {
          res[i].amounts = amounts
        }).catch(err => {
          reject(err)
        })
        let selectGoodsTypesSql = `SELECT * FROM goods_type WHERE goods_id="${res[i].id}";`
        await query(selectGoodsTypesSql).then(type => {
          res[i].type = type
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

let saveGoods = val => {
  return new Promise(async (resolve, reject) => {
    let {title,price,ship_address,courier_fees,goods_category_id,parameter,srcs} = val, clothingAmounts=''
    if(!val.id){
      let id = Util.uuid(), src=''
      let insertGoodsSql = `INSERT INTO goods (id,title,price,ship_address,courier_fees,goods_category_id,parameter,create_time) 
  VALUES ("${id}","${title}",${price},"${ship_address}",${courier_fees},${goods_category_id},"${parameter}",NOW());`
      await query(insertGoodsSql).then(res => {}).catch(err => {reject(err)})
      srcs.forEach((item,index) => {
        if(index == srcs.length-1){
          src+=`("${id}","${item}");`
        }else{
          src+=`("${id}","${item}"),`
        }
      })
      await insertImage(src).then(res => {}).catch(err => {reject(err)})
      if(goods_category_id == CATEGORY.clothing) {
        let insertTypeSql = `INSERT INTO goods_type (goods_id,category_id,part_id,gender) 
    VALUES ("${id}",${goods_category_id},${val.part_id},${val.gender})`
        await query(insertTypeSql).then(res => {}).catch(err => {reject(err)})
        val.clothing_amounts.forEach((item, index) => {
          if(index == val.clothing_amounts.length-1){
            clothingAmounts+=`("${id}",${item.amount},"${item.color}","${item.size}");`
          }else{
            clothingAmounts+=`("${id}",${item.amount},"${item.color}","${item.size}"),`
          }
        })
        let insertAmountSql = `INSERT INTO goods_amount (goods_id,amount,color,size) 
      VALUES ${clothingAmounts}`
        await query(insertAmountSql).then(res => {}).catch(err => {reject(err)})
      }
    }else{
      let updateGoodsSql = `UPDATE goods SET title="${title}",price=${price},ship_address="${ship_address}",
      courier_fees=${courier_fees},goods_category_id=${goods_category_id},parameter="${parameter}" 
      WHERE id="${val.id}";`
      await query(updateGoodsSql).then(res => {}).catch(err => {reject(err)})
      if(goods_category_id == CATEGORY.clothing) {
        let deleteAmountsSql = `DELETE FROM goods_amount WHERE goods_id="${val.id}";`
        await query(deleteAmountsSql).then(res => {}).catch(err => reject(err))
        let deleteTypeSql = `DELETE FROM goods_type WHERE goods_id="${val.id}";`
        await query(deleteTypeSql).then(res => {}).catch(err => reject(err))
        let insertTypeSql = `INSERT INTO goods_type (goods_id,category_id,part_id,gender) 
    VALUES ("${val.id}",${goods_category_id},${val.part_id},${val.gender})`
        await query(insertTypeSql).then(res => {}).catch(err => {reject(err)})
        val.clothing_amounts.forEach((item, index) => {
          if(index == val.clothing_amounts.length-1){
            clothingAmounts+=`("${val.id}",${item.amount},"${item.color}","${item.size}");`
          }else{
            clothingAmounts+=`("${val.id}",${item.amount},"${item.color}","${item.size}"),`
          }
        })
        let insertAmountSql = `INSERT INTO goods_amount (goods_id,amount,color,size) 
      VALUES ${clothingAmounts}`
        await query(insertAmountSql).then(res => {}).catch(err => {reject(err)})
      }

    }
    resolve({})
  })
}

let insertImage = val => {
  let insertImgSql = `INSERT INTO goods_images (goods_id,src) VALUES ${val}`
  return new Promise(async (resolve, reject) => {
    await query(insertImgSql).then(res => {resolve(res)}).catch(err => {reject(err)})
  })
}

let getCategoryList = val => {
  let selevtCategoryListSql = `SELECT * from goods_category`
  return query(selevtCategoryListSql)
}

let getTypesList = val => {
  let selectTypesList = `SELECT * from goods_types`
  return query(selectTypesList)
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

let deleteGoodsById = val => {
  return new Promise(async (resolve, reject) => {
    let deleteGoodsSql = `DELETE FROM goods WHERE id="${val.id}";`
    await query(deleteGoodsSql).then(res => {}).catch(err => reject(err))
    let deleteAmountsSql = `DELETE FROM goods_amount WHERE goods_id="${val.id}";`
    await query(deleteAmountsSql).then(res => {}).catch(err => reject(err))
    let deleteImagesSql = `DELETE FROM goods_images WHERE goods_id="${val.id}";`
    await query(deleteImagesSql).then(res => {}).catch(err => reject(err))
    let deleteTypeSql = `DELETE FROM goods_type WHERE goods_id="${val.id}";`
    await query(deleteTypeSql).then(res => {}).catch(err => reject(err))
    resolve()
  })
}

module.exports = {
  goodsList,
  saveGoods,
  getCategoryList,
  getTypesList,
  getGoodsById,
  deleteGoodsById
}