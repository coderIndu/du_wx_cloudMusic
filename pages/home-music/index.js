// pages/home-music/index.js
import { getSwiper } from '../../service/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: []
  },

  getData() {
    this.getSwiperData()
  },
  onChange: function(value) {   // 搜索框内容改变函数
    console.log(111, value.detail)
  },
  onSearch: function(value) {  // 点击搜索
    console.log(21111, value.detail)
  },
  getSwiperData() {     // 获取轮播图数据
    getSwiper().then(res => {
      if(res.statusCode === 200) {
        const data = res.data.banners.map(item => {
          return {
            imgUrl: item.pic,
            url: item.url
          }
        })
     
        this.setData({swiperData: data})
        // console.log(this.data.swiperData)
      }
    })
  },
  swiperTap(value) {       // 点击轮播图
    console.log(2333, value.detail.url)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})