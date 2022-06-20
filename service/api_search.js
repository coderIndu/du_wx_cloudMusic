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

export function getSearchSuggest(keywords) {
  return http.get('/search/suggest', {keywords, type: 'mobile'})
}