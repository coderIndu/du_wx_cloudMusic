import http from './index'

/**
 * 获取mv排行数据
 * @param {number} offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @param {number} limit 
 */
export function getTopMv(offset, limit=10) {
  return http.get('/top/mv', { offset, limit })
}

/**
 * 获取mv数据（视频链接由于防盗处理，需使用/mv/url获取）
 * @param {number} mvid mv的id
 */
export function getMvDetail(mvid) {
  return handleRes(http.get('/mv/detail', {mvid} ))
}

/**
 * 获取mv的播放链接
 * @param {number} id mv的id
 */
export function getMvUrl(id) {
  return handleRes(http.get('/mv/url', {id}))
}

/**
 * 获取相关视频推荐
 * @param {number} id mv的id 
 */
export function getRelatedVideo(id) {
  return handleRes(http.get('/related/allvideo', {id}))
}

/**
 * 拦截响应,过滤数据
 * @param {promise} requsest get或post请求
 */
function handleRes(requsest) {
  return new Promise(resolve => {
    requsest.then(res => {
      if(res.data.code === 200) {
        resolve(res.data.data)
      }
      resolve(null)
    })
  }) 
}