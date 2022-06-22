import http from './index'

/**
 * 获取歌曲详情
 * @param {*} ids 歌曲id
 */
export function getSongDetail(ids) {
  return http.get('/song/detail', {ids})
}

/**
 * 获取歌曲播放链接
 * @param {*} id 歌曲id
 */
export function getMusicUrl(id) {
  return http.get('/song/url', {id})
}

/**
 * 获取歌曲的歌词
 * @param {*} id 
 */
export function getLyric(id) {
  return http.get('/lyric', {id})
}