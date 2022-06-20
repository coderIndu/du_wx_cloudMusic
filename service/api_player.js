import http from './index'

/**
 * 获取歌曲详情
 * @param {*} ids 歌曲id
 */
export function getSongDetail(ids) {
  return http.get('/song/detail', {ids})
}