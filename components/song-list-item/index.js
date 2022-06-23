// components/song-list-item/index.js
import { playStore } from '../../store/audio-player'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    playClick() {
      const id = this.properties.item.id
      // 获取歌曲信息
      playStore.dispatch("getMusicInfosAction", {id})
      wx.navigateTo({
        url: '/pages/music-player/index?id=' + id,
      })
  
    }
  }
})
