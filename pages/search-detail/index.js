// pages/search-detail/index.js
import { getSeachHot, getDefaultHot, getSearchSuggest, getSearchList } from '../../service/api_search'
import { debounce } from '../../utils/util'
import stringToNode from '../../utils/stringToNode'
const getSearchSuggest_debounce =  debounce(getSearchSuggest)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hots: [],           // 热搜关键词列表
    searchValue: "",    // 搜索词
    placeholder: "",    // 默认搜索关键词
    suggestList: "",    // 搜索建议
    suggestListNodes: [], // 搜索建议富文本
    searchSongs: [],      // 搜索到的歌曲
  },
  //  事件处理
  valueChange({detail}) {
    this.setData({searchValue: detail})
    if(!this.data.searchValue.length) {
      this.setData({suggestList: []})
      this.setData({suggestListNodes: []})
      return
    }
    getSearchSuggest_debounce(this.data.searchValue).then(res => {
      const suggestList = res.result.allMatch
      const keywords = suggestList.map(item => item.keyword)
      this.setData({suggestList: keywords})
      const suggestListNodes = []  // 保存node配置
      // 处理node数据
      keywords.forEach(word => {
        const node = stringToNode(word, detail)
        suggestListNodes.push(node)
      })
      this.setData({suggestListNodes})
    })
  },
  handlerSearch() {   // 搜索歌曲
    const value = this.data.searchValue
    getSearchList(value).then(res => {
      console.log(res);
      this.setData({searchSongs: res.result.songs})
    })
  },
  itemClick(event) {   // 搜索item点击事件
    // 1. 获取搜索词
    const { keyword } = event.currentTarget.dataset   // 获取下标
    this.setData({searchValue: keyword})

    // 2. 开始搜索
    this.handlerSearch()
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