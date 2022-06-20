/**
 * 格式化Date
 * @param {Date} date 
 */
export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

/**
 * 格式化数字
 * @param {Number} n 
 */
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


export function debounce(fn, delay=500) {
  let timer = null

  return function _debounce(...args) {
    return new Promise(resolve => {
      if(timer) clearTimeout(timer)
    
      timer = setTimeout(() => {
        fn.apply(this, args).then(res => {
          resolve(res)
        })
      }, delay);
    })
  }
}