// pages/home-music/index.js
import store from '../../store/index'
import { audioContent, playStore } from '../../store/audio-player'
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
    currentData: {},   // 当前播放歌曲
    currentLyric: '',  // 当前歌词
    isPlayer: true,      // 歌曲播放状态
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
  handleListState(type) {    // 处理榜单数据
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
    this.setData({currentData: {}})
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
    store.onState('newMenu', this.handleListState('newMenu'))
    store.onState('originMenu', this.handleListState('originMenu'))
    store.onState('upMenu', this.handleListState('upMenu'))
  },
  onShow: function() {
    playStore.onStates(['currentData', 'currentLyric'], ({currentData, currentLyric }) => {
      if(currentData) this.setData({currentData})
      if(currentLyric) this.setData({currentLyric})
    })
  },
  // 事件处理
  handleSongClick(event) {
    const index = event.currentTarget.dataset.index
    const menu = this.data.hotMenu.tracks
    playStore.dispatch("getSongListAction", {index, menu})
  },
  playClick() {   // 工具栏播放控制
    let isPlayer = this.data.isPlayer
    playStore.onStates(["isPlaying"], ({isPlaying}) => {
      isPlayer = !isPlaying
    })
    this.setData({isPlayer})    // 设置状态图标
    playStore.dispatch("onControlMusicAction", isPlayer)  // 控制播放
  },
  goToMusicDetail() {   // 点击工具栏跳转到歌曲详情
    console.log(2333);
    wx.navigateTo({
      url: '/pages/music-player/index',
    })
  }
})