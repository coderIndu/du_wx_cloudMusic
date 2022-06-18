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

  /**
   * 获取视频相关详情
   * @param {*} id mv的id
   */
  getData(id) {
    // 获取封面信息
    getMvDetail(id).then(res => {
      res.data && this.setData({mvDetail: res.data})
    })
    // 获取视频播放信息
    getMvUrl(id).then(res => {
      res?.data?.url && this.setData({mvUrl: res.data.url})
    })
    // 获取视频推荐列表
    getRelatedVideo(id).then(res => {
      res?.data && this.setData({relatedList: res.data})
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