const os = require('os')
module.exports = {
  getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  },
  setResult(res,msg,sta,err,total) {
    return {
      result: res || {},
      message: msg || 'ok',
      status: sta || 200,
      error: err || null,
      total: total || null
    }
  },
  uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  getDate(date) {
    let [yyyy,MM,dd,hh,mm,ss] = [
      date.getFullYear(),
      date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1,
      date.getDate()<10?'0'+date.getDate():date.getDate(),
      date.getHours()<10?'0'+date.getHours():date.getHours(),
      date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(),
      date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
    ]
    return [yyyy,MM,dd].join('-') +' '+ [hh,mm,ss].join(':')
  },

  /**
   *  权限数据转换前端tree结构数组
   */
  setPermissionsToArray(arr) {
    let target = []
    if(Array.isArray(arr) && arr.length > 0) {
      target = arr.filter(item => {return item.parent_id === 0})
      target.forEach(item => {
        let children = arr.filter(i => {return item.id === i.parent_id})
        if(children.length>0) {
          item.children = children
          item.children.forEach(k => {
            let child = arr.filter(i => {return k.id === i.parent_id})
            if(child.length>0){
              k.children = child
            }
          })
        }
      })
    }
    return target
  },

  /**
   *  解析前端传过来pemissions数组
   */
  setPermissions(arr, target) {
    if(Array.isArray(arr) && arr.length>0){
      arr.forEach(item => {
        let obj = {}
        obj.id = item.id
        obj.label = item.label
        obj.identify = item.identify
        obj.parent_id = item.parent_id
        target.push(obj)
        if(item.children && item.children.length>0) {
          this.setPermissions(item.children, target)
        }
      })
    }
  },

  /**
   *  jsonwebtoken签名
   */
  tokenSecret() {
    return 'h2o_token_secret'
  },

  /**
   *  token验证路由白名单
   */
  tokenWhiteUrl() {
    return [
      '/login',
      '/refreshToken',
      '/logout'
    ]
  }
}