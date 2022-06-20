import http from './index'

/**
 * 获取热搜标签
 */
export function getSeachHot() {
  return http.get('/search/hot')
}

/**
 * 获取默认热搜词
 */
export function getDefaultHot() {
  return http.get('/search/default')
}

/**
 * 获取搜索建议列表
 * @param {String} keywords 
 */
export function getSearchSuggest(keywords) {
  return http.get('/search/suggest', {keywords, type: 'mobile'})
}

/**
 * 搜索歌曲
 * @param {*} keywords 
 * @param {*} limit 
 * @param {*} offset 
 */
export function getSearchList(keywords, limit=30, offset=0) {
  return http.get('/search', {keywords, limit, offset})
}