// pages/video-details/index.js
import { getMvDetail, getMvUrl, getRelatedVideo } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvDetail: {},
    mvUrl: '',
    relatedList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取mvid
    const { id } = options
    
    // 通过id获取页面数据
    this.getData(id)
  },

  getData(id) {
    // 获取封面信息
    getMvDetail(id).then(res => {
      res !== null && this.setData({mvDetail: res})
    })
    // 获取视频播放信息
    getMvUrl(id).then(res => {
      res !== null && this.setData({mvUrl: res.url})
    })
    // 获取视频推荐列表
    getRelatedVideo(id).then(res => {
      res !== null && this.setData({relatedList: res})
    })
  },
 
  /**
   * 兼容ios禁止页面下拉
   * @param {*} e 
   */
  onPageScroll:function(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  }

})