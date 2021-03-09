// pages/databaseGuide/databaseGuide.js

import {
    removeCountersApi,
    updateCountersApi,
    getOpenidApi,
    addCountersApi,
    queryCountersApi
} from '../../base/api'

const app = getApp()

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
    currentCounter : 0
  },

  async onLoad(options) {
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    if (openid) {
      this.setData({
        openid
      })
    }else{
        openid = await getOpenidApi();
        if(openid){
            wx.setStorageSync('openid', openid);
        }
    }
  },

  gotoPage: function(event){
    var index = event.currentTarget.dataset.index;
    this.setData({
       step: index + 1
    });
  },

  async onAdd() {
    let countersInfo = {
        _openid : this.data.openid,
        count : 1
    };
    await addCountersApi(countersInfo);
    wx.showToast({
        title: '新增记录成功'
      })
  },

  async onQuery() {

    const res = await queryCountersApi(this.data.openid);
    this.setData({
        queryResult: JSON.stringify(res.result, null, 2)
    })
  },

  async onRemove() {

    let countersInfo = {
        openid : this.data.openid
    };
    await removeCountersApi(countersInfo);
    wx.showToast({
        title: '删除记录成功'
    })

  },

  nextStep: function () {
    const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }
    this.setData({
    step: this.data.step + 1
    }, callback)
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  },

  setValue: function(e){
    this.setData({
        currentCounter : e.detail.value
    })
  },

  async onCounterUpdate() {
    let countersInfo = {
        openid : this.data.openid,
        count : Number(this.data.currentCounter)
    };
    await updateCountersApi(countersInfo);
    wx.showToast({
        title: '新增记录成功'
    })
  },

})
