// pages/music-player/cpns/control/index.js
import { playStore } from '../../../../store/audio-player'

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
    isPlaying: true,   // 播放状态，默认播放
    playMode: 'order',
    playModes: ['order', 'random','repeat'],    // 左侧播放模式
  },
  pageLifetimes: {
    show() {
      playStore.onStates(["playMode", "isPlaying"], ({playMode, isPlaying}) => {
        if(isPlaying!==undefined) this.setData({isPlaying})
        if(playMode) {
          this.setData({playMode})
        } else {
          this.setData({playMode: this.data.playModes[0]}) // 默认order模式
        }
        playStore.setState("playMode", this.data.playMode)
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    playClick() {   // 控制音乐播放
      playStore.dispatch("onControlMusicAction", this.data.isPlaying)
    },
    modeClick() {   // 歌曲播放模式
      const {playMode, playModes} = this.data
      let index = this.data.playModes.indexOf(playMode)
      if(index + 1 > playModes.length - 1) {
        index = -1
      }
      this.setData({playMode: playModes[index + 1]})
      playStore.setState("playMode", playModes[index + 1])
    },
    // ============= 控制播放部分 =============
    preClick() {
      playStore.dispatch("changeNewMusicAction", false)
    },
    nextClick() {
      playStore.dispatch("changeNewMusicAction")
    }
  }
})
