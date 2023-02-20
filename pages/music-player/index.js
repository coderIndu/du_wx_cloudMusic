// pages/music-player/index.js
import { audioContent, playStore } from '../../store/audio-player'



Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0,   // 页面索引
    currentData: {},   // 歌曲数据
    // 滑块部分
    currentTime: 0,
    totalTime: 0,
    isSliderChange: false,
    sliderValue: 0,
    isClickSlider: false,
    // 歌词部分
    lyrics: [],
    currentLyric: '',
    currentIndex: 0
  },

  backToPre() { // 返回
    wx.navigateBack()
  },
  navClick(event) {   // 点击切换页面
    const { index } = event.currentTarget.dataset
    this.setData({currentPage: index})
  },
  pageChange(event) {  // 页面滑动
    const index = event.detail.current
    this.setData({currentPage: index})
  },
  // ============= 滚动条事件监听 =============
  onSliderClick(event) {   // slider点击
    const seekTime = event.detail.value * this.data.totalTime / 100
    audioContent.pause()
    audioContent.seek(seekTime  / 1000)
    this.setData({sliderValue: event.detail.value, isSliderChange: false, isClickSlider: true})
     // 监听跳转完成
    setTimeout(() => {
      this.setData({isClickSlider: false})
    }, 200);
  },
  onSliderChange(event) {   // slider滑动
    const seekTime = event.detail.value * this.data.totalTime / 100
    console.log("seekTime", seekTime);
    this.setData({currentTime: seekTime})
    this.data.isSliderChange = true
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 监听歌曲基本播放信息
    const musicBasicInfo = ["currentData", "totalTime", "currentTime"]
    playStore.onStates(musicBasicInfo, (res) => {
      const { currentData, totalTime, currentTime } = res
      // console.log(res);
      if(currentData ) this.setData({currentData})
      if(totalTime !== undefined) this.setData({totalTime}) 
      if(currentTime !== undefined && !this.data.isSliderChange && !this.data.isClickSlider) {   
        const sliderValue = currentTime / this.data.totalTime * 100
        // console.log(this.data.totalTime)
        this.setData({currentTime, sliderValue})
      }
    })
    // 监听歌词
    const lyricInfo = ["currentLyric", "lyrics", "currentIndex"]
    playStore.onStates(lyricInfo, ({currentLyric, lyrics, currentIndex}) => {
      if(currentLyric) this.setData({currentLyric})
      if(lyrics?.length) this.setData({lyrics})
      if(currentIndex !== undefined) this.setData({currentIndex})
    })
  },
})