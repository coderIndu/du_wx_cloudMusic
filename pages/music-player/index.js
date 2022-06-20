// pages/music-player/index.js
import { getSongDetail } from '../../service/api_player'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,   // 页面索引
    currentData: {}   // 歌曲数据
  },

  backToPre() { // 返回
    wx.navigateBack()
  },

  pageChange(event) {  // 页面滑动
    const index = event.detail.current
    this.setData({currentPage: index})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    getSongDetail(id).then(res => {
      this.setData({currentData: res.songs[0]})
    })
  },
})