// pages/music-player/index.js
import { getSongDetail, getMusicUrl, getLyric } from '../../service/api_player'
import { audioContent } from '../../store/audio-player'
import { parseLyric } from '../../utils/parseLyric'
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
  // 音乐播放/歌词控制
  musicPlay(url) {
    audioContent.stop()   
    audioContent.src = url
    // 监听加载资源完成
    audioContent.onCanplay(() => {
      audioContent.play()
    })
    // 获取当前播放时间
    audioContent.onTimeUpdate(() => {
      const currentTime = audioContent.currentTime * 1000
      if(!this.data.isSliderChange) {
        this.setData({currentTime})

        // 处理歌词部分
        const lyrics = this.data.lyrics
        let i = 0
        for (; i < lyrics.length; i++) {
          const item = lyrics[i]
          if(currentTime < item.time) {
            break
          }
        }
        const currentIndex = i - 1
        // 设置当前歌词
        if(this.data.currentIndex !== currentIndex) {
          const currentLyric = lyrics[currentIndex].text
          this.setData({currentIndex, currentLyric})
        }
      }
    })
    // 自然播放结束监听
    audioContent.onEnded(() => {
      this.setData({currentTime: this.data.totalTime})
    })
  },
  // ============= 滚动条事件监听 =============
  onSliderclick(event) {   // slider点击
    const seekTime = event.detail
    audioContent.pause()
    audioContent.seek(seekTime / 1000)
    audioContent.onSeeked(() => {
      audioContent.play()
    })
    this.setData({currentTime: seekTime, isSliderChange: false})
  },
  sliderChange(event) {   // slider滑动
    this.setData({currentTime: event.detail})
    this.data.isSliderChange = true
  },
  // ============= 控制播放部分 =============
  preClick() {
    
  },
  nextClick() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { id } = options
    // 获取歌曲播放链接
    getMusicUrl(id).then(res => {
      const url = res.data[0].url
      this.musicPlay(url)
    })
    // 获取歌曲详情
    getSongDetail(id).then(res => {
      const detail = res.songs[0]
      this.setData({currentData: detail, totalTime: detail.dt, currentLyric: detail.name})
    })
    // 获取歌曲歌词
    getLyric(id).then(res => {
      const lyric = res.lrc.lyric
      const lyrics =  parseLyric(lyric)
      this.setData({lyrics})
    })
  },
})