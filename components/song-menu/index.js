// components/song-menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '热门歌单'
    },
    item: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(event) {
      const { id } = event.currentTarget.dataset
      this.triggerEvent("click", id)
    }
   }
})
