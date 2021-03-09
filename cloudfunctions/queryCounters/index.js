// 云函数入口文件
const cloud = require('wx-server-sdk')

//初始化云环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 查询用户
exports.main = async (event,context) => {
  const openid = event.openid;
  return new Promise((resolve, reject) => {
    db.collection('counters').where({
      _openid: openid
    }).get().then(res => {
      if(res.data.length > 0){
        resolve(res.data[0]);
      }else{
        resolve(false);
      }  
    }).catch(err => {
      resolve(false);
    })
  })
}