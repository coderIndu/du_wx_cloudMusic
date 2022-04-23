const BASE_URL = 'http://114.132.229.173:3000'
// 封装请求
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

// 封装get请求
const get = (url, params) => {
  return request(url, 'GET', params)
}

// 封装post请求
const post = (url, data) => {
  return request(url, 'POST', data)
}

const http = {
  request: request,
  get: get,
  post: post
}

export default http