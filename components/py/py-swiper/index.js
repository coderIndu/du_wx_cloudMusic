// components/py/py-swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indicatorDots: {    // 是否显示指示器
      type: Boolean,
      value: true,
    },
    vertical: {         // 是否开启垂直方向
      type: Boolean,  
      value: false
    },
    autoplay: {         // 是否自动播放  
      type: Boolean,
      value: true
    },
    interval: {         // 显示时间
      type: Number,
      value: 2000
    },
    duration: {         // 滑动动画时长
      type: Number,
      value: 500
    },
    data: {             // 轮播图数据：{ imgUrl: xxx, url: xxx } 图片地址和内容地址
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
    tap(e) {
      this.triggerEvent('click', e.currentTarget.dataset)
    }
  },
  attached: function() {

  },
})
