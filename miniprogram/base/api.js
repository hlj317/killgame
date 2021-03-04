import env from '../config'

/* [云函数API]获取用户openid */
const getOpenidApi = function() {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getOpenOid',
      // 传给云函数的参数
      data: {
      },
      success(res) {
        resolve(res.result.openid);
      },
      fail(error) {
        reject(false)
      }
    });
  })
}

export{ 
  getOpenidApi
}