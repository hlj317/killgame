// 云函数入口文件
const cloud = require('wx-server-sdk')

//初始化云环境
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event,context) => {
  const countersInfo = event.countersInfo
  return new Promise((resolve, reject) => {
    db.collection('counters').where({
      _openid: countersInfo.openid
    }).remove(res => {
      resolve(res);
    }).catch(err => {
      resolve(false);
    })
  })
}