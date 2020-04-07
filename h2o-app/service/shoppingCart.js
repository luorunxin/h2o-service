const { query } = require('../../mysql/init')
const { CATEGORY, GOODSLISTRANK,DISCOUNTSERVICE } = require('../../utils/enum')
const Util = require('../../utils/util')

let addShoppingCart = async val => {
  try {
    let selectShoppingCartSql = `SELECT * FROM shopping_cart WHERE goods_id="${val.goods_id}" AND user="${val.phone}";`, data = null
    await query(selectShoppingCartSql).then(res => data = res)
    if(data.length > 0){
      return Util.setResult({},'商品已经在购物车等候着!',412)
    }
    let addShoppingCartSql = `INSERT INTO shopping_cart (goods_id,select_sku,sku_num,create_time,user) 
    VALUES ("${val.goods_id}",${val.id},${val.sku_num},NOW(),"${val.phone}");`
    await query(addShoppingCartSql).then(res => data = res)
    return Util.setResult()
  } catch (e) {
    return e
  }
}

let getShoppingCartList = async val => {
  try {
    let {page,size} = val, data = null
    page = (page-1)*size
    let getShoppingCartListSql = `SELECT goods.title,goods.price,shopping_cart.goods_id,shopping_cart.id,shopping_cart.sku_num,goods_amount.size,goods_amount.color
FROM goods RIGHT JOIN shopping_cart ON goods.id=shopping_cart.goods_id 
LEFT JOIN goods_amount ON shopping_cart.select_sku=goods_amount.id 
WHERE shopping_cart.user="${val.phone}"
order by shopping_cart.create_time DESC limit ${page},${size};`
    await query(getShoppingCartListSql).then(res => data = res)
    for(let i in data){
      let selectImageSql = `SELECT src FROM goods_images WHERE goods_id="${data[i].goods_id}";`
      await query(selectImageSql).then(res => {data[i].src = res[0].src})
    }
    return data
  } catch (e) {
    return e
  }
}

let deleteShoppingCartById = async val => {
  try {
    let deleteShoppingCartByIdSql = `DELETE FROM shopping_cart WHERE id=${val.id} AND user="${val.phone}";`
    await query(deleteShoppingCartByIdSql)
    return {}
  } catch (e) {
    return e
  }
}

let deleteShoppingCart = async val => {
  try {
    let ids = val.ids.join(',')
    let deleteShoppingCartSql = `DELETE FROM shopping_cart WHERE id in (${ids}) AND user="${val.phone}";`
    await query(deleteShoppingCartSql)
    return {}
  } catch (e) {
    return e
  }
}

let updateShoppingCartById = async val => {
  try {
    let updateShoppingCartByIdSql = `UPDATE shopping_cart SET select_sku=${val.select_sku} WHERE id=${val.id} AND user="${val.phone}";`
    await query(updateShoppingCartByIdSql).then()
    return {}
  } catch (e) {
    return e
  }
}

module.exports = {
  addShoppingCart,
  getShoppingCartList,
  deleteShoppingCartById,
  deleteShoppingCart,
  updateShoppingCartById
}