// const BASE_URL = 'http://114.132.229.173:4000'
const BASE_URL = 'http://167.88.186.119:4000'
// 封装请求
const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      success: res => resolve(res.data),
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

const http = {
  request: request,
  get: get,
  post: post,
  handleRes
}

export default http