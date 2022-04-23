// pages/home-video/index.js
import { getTopMv } from '../../service/api_video'
import { onRefresh, stopRefresh } from '../../utils/page'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mvs: [],
    offset: 0,  // 请求数据页数
    over: false // 请求数据失败，不允许上滑更新数据
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  init() {  // 初始化数据
    this.setData({over: false, mvs: []})  
  }, 
   
  getData(offset = 0) {   // 获取mv数据
    getTopMv(offset).then(res => {
      if (res.data.code === 200) {
        let mvs = this.data.mvs
        mvs.push(...res.data.data)
        this.setData({ mvs })
      } else {
        this.setData({over: true})
        wx.showToast({
          title:"已经到底啦~",
          duration: 1000, //持续的时间
          icon: 'none', //图标
          mask: true //显示透明蒙层 防止触摸穿透
        })
      }
      // 取消loading
      stopRefresh()
    })
  }, 
      
  // 监听下拉
  onPullDownRefresh: function () {
    onRefresh()
    this.init()
    this.getData()
  }, 
  // 监听上拉触底
  onReachBottom: function() {
    console.log('onReachBottom')
    if(!this.data.over) {
      onRefresh() 
      this.getData(this.data.mvs.length)
    }
  },
  
})