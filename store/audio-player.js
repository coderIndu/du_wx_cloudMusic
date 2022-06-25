import { HYEventStore } from 'hy-event-store'
import { getSongDetail, getMusicUrl, getLyric } from '../service/api_player'
import { parseLyric } from '../utils/parseLyric'

// const audioContent = wx.createInnerAudioContext()
const audioContent = wx.getBackgroundAudioManager()

const playStore = new HYEventStore({
  state: {
    isPlaying: true,
    isFirstPlay: true,
    id: 0,  // 歌曲id
    currentData: {},   // 歌曲数据
    // 基本信息
    totalTime: 0,
    currentTime: 0, 
    musicUrl: '',
    // 歌词
    lyrics: [],
    currentLyric: '',
    currentIndex: 0,
    // 控制
    playIcon: '',
    playMode: '',
    playChange: '',
    songList: [],
    songIndex: 0
  },
  actions: {
    // 获取歌曲基本信息
    getMusicInfosAction(ctx, {id, isRefersh = false}) {
      if(ctx.id === id && !isRefersh ) return

      this.dispatch("initStateAction")
      ctx.id = id

      // 获取歌曲详情
      getSongDetail(id).then(res => {
        const detail = res.songs[0]
        ctx.currentData = detail
        ctx.totalTime = detail.dt
        ctx.currentLyric = detail.name
        audioContent.title = detail.name
      })

      // 获取歌曲歌词
      getLyric(id).then(res => {
        const lyric = res.lrc.lyric
        const lyrics =  parseLyric(lyric)
        ctx.lyrics = lyrics
      })

      // 获取歌曲播放链接
      getMusicUrl(id).then(res => {
        ctx.musicUrl = res.data[0].url
        if(audioContent.paused) audioContent.stop()  
        audioContent.src = ctx.musicUrl
        audioContent.title = ctx.currentData.name
        this.dispatch('onAudioContentListenerAction')
      })

    },
    // 监听audioContent的事件
    onAudioContentListenerAction(ctx) {
      // 监听加载资源完成
      audioContent.onCanplay(() => {
        audioContent.title = ctx.currentData.name
        audioContent.play()
      })
      // 获取当前播放时间
      audioContent.onTimeUpdate(() => {
        const currentTime = audioContent.currentTime * 1000
        
        // 1. 处理歌词部分
        const lyrics = ctx.lyrics
        let i = 0
        for (; i < lyrics.length; i++) {
          const item = lyrics[i]
          if(currentTime < item.time) {
            break
          }
        }
        const currentIndex = i - 1
        // 2. 设置当前歌词
        if(ctx.currentIndex !== currentIndex) {
          const currentLyric = lyrics[currentIndex]?.text
          ctx.currentIndex = currentIndex
          ctx.currentLyric = currentLyric
          ctx.currentTime = currentTime
        }
        
      })
      // 监听跳转完成
      audioContent.onSeeked(() => {
        setTimeout(() => {
          audioContent.play()
        }, 200);
      })
      // 自然播放结束监听
      audioContent.onEnded(() => {
        ctx.currentTime = ctx.totalTime
        this.dispatch("changeNewMusicAction")
      })
    },
    // 控制歌曲操作
    onControlMusicAction(ctx, isPlaying = true) {
      // 播放/暂停歌曲
      isPlaying ? audioContent.pause() : audioContent.play()
      ctx.isPlaying = !isPlaying
    },
    // 初始化数据
    initStateAction(ctx) {
      // audioContent.offTimeUpdate()
      const newCtx = {
        currentTime: 0, 
        currentData: {},   // 歌曲数据
        // 基本信息
        totalTime: 0,
        musicUrl: '',
        // 歌词
        lyrics: [],
        currentLyric: '',
        currentIndex: 0,
        }

      Object.keys(newCtx).forEach(key => {
        ctx[key] = newCtx[key]
      })
    },
    // 切换歌曲
    changeNewMusicAction(ctx, isNext = true) {
      // 1. 获取下标
      let { songIndex: index, songList, playMode } = ctx
      const length = ctx.songList.length
      // 2. 切换模式
      switch(playMode) {
        case 'order':   // 顺序播放
          isNext ? index = index + 1 : index = index - 1
          if(index === -1) index = length - 1
          if(index === length) index = 0
          break;
        case 'repeat':  // 单曲循环
          break;
        case 'random':  // 随机播放
          index = Math.floor(Math.random() * length) 
          break;
      }
      // 3. 保存index
      ctx.songIndex = index
      const id = songList[index].id
      // 4. 切换歌曲
      this.dispatch("getMusicInfosAction", {id, isRefersh: true})
    },
    // 获取歌曲列表
    getSongListAction(ctx, {index, menu}) {
      ctx.songList = menu
      ctx.songIndex = index
    },
    // 后台播放

  }
})

export {
  audioContent,
  playStore
}
