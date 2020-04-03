module.exports = {
  CATEGORY: {
    clothing: 1001 // 服装
  },
  GOODSLISTRANK: {
    1: {
      name: 'goods.create_time',
      solt: 'DESC'
    },
    2: {
      name: 'goods.price',
      solt: 'DESC'
    },
    3: {
      name: 'goods.price',
      solt: 'ASC'
    },
    4: {
      name: 'goods.monthly_sales',
      solt: 'DESC'
    }
  },
  DISCOUNTSERVICE: {
    1: 'goods.courier_fees=0' //包邮
  },
}