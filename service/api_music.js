import http from './index'

/**
 * 0: pc 1: android 2: iphone 3: ipad
 * @param {Number} type 获取轮播图数据
 */
export function getSwiper(type=2) {
  return http.get('/banner', {type})
}