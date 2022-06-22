// pages/music-player/cpns/slider/index.js
import { audioContent } from '../../../../store/audio-player'

Component({
  properties: {
    currentTime: {
      type: Number,
      value: 0
    },
    totalTime: {
      type: Number,
      value: 0
    },
  },
  data: {
    value: 0
  },
  methods: {
    getSliderValue(event) {
       // 1. 获取当前百分比进度
       const value = event.detail.value
       // 2. 获取对应的播放时间
       const currentTime = this.data.totalTime * value / 100
       return currentTime
    },
    onSliderClick(event) {
      const currentTime = this.getSliderValue(event)
      // 3. 发出事件
      this.triggerEvent('click', currentTime)                
    },
    onSliderChanging(event) {
      const currentTime = this.getSliderValue(event)
      this.triggerEvent('sliderChange', currentTime)
    }
  },
  observers: {
    'currentTime': function(val) {
      const totalTime = this.properties.totalTime
      this.setData({value: val / totalTime * 100})
    
    }
  }
})
