// components/py/py-search/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入搜索关键词'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function() {
      this.triggerEvent('change', this.data.value)
    },
    click: function() {
      this.triggerEvent('click')
    },
  }
})
