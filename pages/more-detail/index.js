// pages/more-detail/index.js
import store from '../../store/index'
import { getSongMenu, getAllSongs } from '../../service/api_music'
import { playStore } from '../../store/audio-player'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songsList: {}
  },
  
  async getMenuData(id) {     // 获取歌单详情
    const { playlist } = await getSongMenu(id)
    this.setData({songsList: playlist})
    const { songs } = await getAllSongs(id)
    playlist.tracks = songs
    this.setData({songsList: playlist})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    // 属于状态中的榜单数据
    if(store.state[id]) {
      store.onState(id, res => {
        this.setData({songsList: res})
      })
    } else {
      this.getMenuData(id)
    }
  },
  // 事件处理
  handleSongClick(event) {
    const index = event.currentTarget.dataset.index
    const menu = this.data.songsList.tracks
    playStore.dispatch('getSongListAction', {index, menu})
  }
 
})