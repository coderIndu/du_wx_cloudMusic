// pages/home-music/index.js
import store from '../../store/index'
import { getSwiper, getPlayList } from '../../service/api_music'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    hotMenu: [],       // 推荐歌曲
    hotPlayList: {},   // 热门歌单
    recommendPlayList: {}, // 推荐歌单
    listOfAll: {       // 所有榜单
      "newMenu": {},
      "originMenu": {},
      "upMenu": {}
    },      
  },

  getData() {   // 获取数据
    this.getSwiperData()
    this.getPlayListData()
  },
  onChange: function(value) {   // 搜索框内容改变函数
    console.log(111, value.detail)
  },
  onSearch: function(value) {  // 点击搜索
    console.log(21111, value.detail)
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
  getPlayListData() {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    // 获取榜单数据
    store.dispatch("getSongMenuAction")
    // 处理数据
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