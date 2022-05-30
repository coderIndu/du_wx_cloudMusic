// components/py/py-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    value: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function() {
      this.triggerEvent('change', this.data.value)
    },
    onSearch: function() {
      this.triggerEvent('search', this.data.value)
    }
  }
})
