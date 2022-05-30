/**
 * 添加刷新动画
 */
export function onRefresh() {   // 添加刷新动画
  //在当前页面显示导航条加载动画
  wx.showNavigationBarLoading();
  //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  wx.showLoading({
    title: '刷新中...'
  })
}

/**
 * 停止显示刷新
 * @param {Number} timer 显示时间
 */
export function stopRefresh(timer=500) {   // 停止刷新
  setTimeout(() => {
    wx.hideLoading({
      success: (res) => {
        wx.hideNavigationBarLoading()   // 隐藏nav的刷新图标
        wx.stopPullDownRefresh()    // 停止页面刷新
      }
    })
  }, timer);
}