export function parseLyric(lyricStr) {
  const re = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const lyricArr = []
  // 1. 解析歌词字符串
  const strs = lyricStr.split('\n')
  // 2. 获取歌词对应时间
  strs.forEach(item => {
    const result = re.exec(item)
    if (result) {
      const minute = result[1] * 60 * 1000
      const second = result[2] * 1000
      const fillSecond = result[3] * 1
      const time = minute + second + fillSecond
      const text = item.replace(re, "")
      lyricArr.push({time, text})
    }
  })
  return lyricArr
}

function formatDuration(duration) {
  duration = duration / 1000 // 转换为秒
  var minute = Math.floor(duration / 60) // 获取分
  var second = Math.floor(duration) % 60 // 获取秒
  minute = addZero(minute)
  second = addZero(second)
  return minute + ':' + second
}

function addZero(time) {
  time = time + ""
  return ("00" + time).slice(time.length)
}