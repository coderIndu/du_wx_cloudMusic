import http from './index'

/**
 * 获取mv排行数据
 * @param {偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0} offset 
 * @param {数量} limit 
 */
export function getTopMv(offset, limit=10) {
  return http.get('/top/mv', { offset, limit })
}