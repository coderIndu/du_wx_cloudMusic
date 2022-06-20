// pages/home-music/index.js
import store from '../../store/index'
import { getSwiper, getPlayList } from '../../service/api_music'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    hotMenu: {},       // 推荐歌曲
    hotPlayList: {},   // 热门歌单
    recommendPlayList: {}, // 推荐歌单
    listOfAll: {           // 所有榜单
      "newMenu": {},       // 新歌榜
      "originMenu": {},    // 原创榜
      "upMenu": {}         // 飙升榜
    },      
  },

  getData() {   // 获取数据
    this.getSwiperData()
    this.getPlayListData()
  },
  searchClick() {  // 点击搜索栏
    wx.navigateTo({
      url: '/pages/search-detail/index',
    })
  },
  getSwiperData() {     // 获取轮播图数据
    getSwiper().then(res => {
      if(res.code === 200) {
        const data = res.banners.map(item => {
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
  getPlayListData() {      // 获取歌单数据
    getPlayList("流行").then(res => {
      this.setData({hotPlayList: res.playlists})
    })
    getPlayList("华语").then(res => {
      this.setData({recommendPlayList: res.playlists})
    })
  },
  handlerListState(type) {    // 处理榜单数据
    return (res) => {
      if(Object.keys(res).length === 0) return
      let {coverImgUrl, name, playCount, tracks} = res
      tracks = tracks.slice(0, 3)
      const newList = { coverImgUrl, name, playCount, tracks}
      this.setData({[`listOfAll.${type}`]: newList})
    }
  },
  moreClick(event) {      // 点击更多跳转到详情页
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/more-detail/index?id=${id}`,
    })
  },
  songMenuClick({detail: id}) {
    wx.navigateTo({
      url: `/pages/more-detail/index?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    // 获取榜单数据
    store.dispatch("getSongMenuAction")
    // 处理数据
    store.onState('hotMenu', res => {
      if(Object.keys(res).length === 0) return
      let {coverImgUrl, name, playCount, tracks} = res
      tracks = res.tracks.slice(0, 6)
      const newList = { coverImgUrl, name, playCount, tracks}
      this.setData({hotMenu: newList})
    })
    store.onState('newMenu', this.handlerListState('newMenu'))
    store.onState('originMenu', this.handlerListState('originMenu'))
    store.onState('upMenu', this.handlerListState('upMenu'))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})