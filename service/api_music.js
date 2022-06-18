import http from './index'

/**
 * 0: pc 1: android 2: iphone 3: ipad
 * @param {Number} type 获取轮播图数据
 */
export function getSwiper(type=2) {
  return http.get('/banner', {type})
}

/**
 * 获取榜单
 */
export function getSongList() {
  return http.get('/toplist')
}

/**
 * 获取歌单详情
 * @param {String} id 
 */
export function getSongMenu(id) {
  return http.get('/playlist/detail', {id})
}

export function getPlayList(cat="华语", limit=6, offset=0, order="hot") {
  return http.get('/top/playlist', {
    cat,
    limit,
    offset,
    order
  })
}