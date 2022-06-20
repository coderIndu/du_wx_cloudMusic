// pages/search-detail/index.js
import { getSeachHot, getDefaultHot, getSearchSuggest } from '../../service/api_search'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],           // 热搜关键词列表
    searchValue: "",    // 搜索词
    placeholder: "",    // 默认搜索关键词
    suggestList: [],    // 搜索建议列表
  },
  valueChange({detail}) {
    this.setData({searchValue: detail})
    if(!this.data.searchValue.length) return
    getSearchSuggest(this.data.searchValue).then(res => {
      this.setData({suggestList: res.result.allMatch})
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取热搜标签
    getSeachHot().then(res => {
      this.setData({hots: res.result.hots})
    })
    // 获取默认搜索词
    getDefaultHot().then(res => {
      this.setData({placeholder: res.data.showKeyword})
    })
  },
})