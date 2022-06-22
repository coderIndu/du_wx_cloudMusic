// app.js
console.log();
App({
  onLaunch() {
    // 展示本地存储能力
    const storage = wx.getSystemInfoSync()
    this.globalData.statusBarHeight = storage.statusBarHeight
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    statusBarHeight: 0,
  },

})
