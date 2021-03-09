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
        resolve(res.result.userInfo.openId);
      },
      fail(error) {
        reject(false)
      }
    });
  })
}

/* [云函数API]counters添加数据 */
const addCountersApi = function(countersInfo) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'addCounters',
        // 传给云函数的参数
        data: {
            countersInfo
        },
        success(res) {
            resolve(res);
        },
        fail(error) {
          reject(false)
        }
      });
    })
}

/* [云函数API]counters获取数据 */
const queryCountersApi = function(openid) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'queryCounters',
        // 传给云函数的参数
        data: {
            openid: openid
        },
        success(res) {
          resolve(res);
        },
        fail(error) {
          reject(false)
        }
      });
    })
  }

  /* [云函数API]counters更新数据 */
const updateCountersApi = function(countersInfo){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updateCounters',
        // 传给云函数的参数
        data: {
          countersInfo
        },
        success(res) {
          resolve(res);
        },
        fail(error) {
          reject(false)
        }
      });
    })
}

/* [云函数API]counters删除数据 */
const removeCountersApi = function(countersInfo){
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        // 云函数名称
        name: 'removeCounters',
        // 传给云函数的参数
        data: {
          countersInfo
        },
        success(res) {
          resolve(res);
        },
        fail(error) {
          reject(false)
        }
      });
    })
}

export{ 
  getOpenidApi,
  addCountersApi,
  updateCountersApi,
  queryCountersApi,
  removeCountersApi
}