// pages/music-player/cpns/control/index.js
import { audioContent } from '../../../../store/audio-player'
const iconBaseUrl = '/assets/images/player/play_'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    playIcon: 'pause',   // 播放状态，默认播放
    modeUrl: '',
    modeUrls: [iconBaseUrl + 'order.png', iconBaseUrl + 'random.png', iconBaseUrl+'repeat.png'],    // 左侧播放模式
  },
  lifetimes: {
    ready() {
      this.setData({modeUrl: this.data.modeUrls[0]}) // 默认order模式
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    playClick() {   // 控制音乐播放
      let playIcon = this.data.playIcon
      if(playIcon === 'pause') {
        playIcon = 'resume'
        audioContent.pause()
      } else {
        playIcon = 'pause'
        audioContent.play()
      }
      this.setData({playIcon})

    },
    modeClick() {
      const {modeUrl, modeUrls} = this.data
      let index = this.data.modeUrls.indexOf(modeUrl)
      if(index + 1 > modeUrls.length - 1) {
        index = -1
      }
      this.setData({modeUrl: modeUrls[index + 1]})
    },
    preClick() {
      this.triggerEvent('preClick')
    },
    nextClick() {
      this.triggerEvent('nextClick')
    }
  }
})
