import { HYEventStore } from 'hy-event-store'
import { getSongList, getSongMenu } from '../service/api_music'

const songMenuMap = {
  '飙升榜': 'upMenu', 
  '新歌榜': 'newMenu', 
  '原创榜': 'originMenu', 
  '热歌榜': 'hotMenu'
}
const store = new HYEventStore({
  state: {
    upMenu: [],
    newMenu: [],
    originMenu: [],
    hotMenu: [],
    name: ''
  },
  action: {
    getName(ctx) {
      console.log(ctx)
    }
  },
  actions: {
    async getSongMenuAction(ctx) {
      const res = await getSongList()
      const { list } = res
      const filterList = []
      list.forEach(item => {
        if(Object.keys(songMenuMap).indexOf(item.name) !== -1) {
          filterList.push( { name: item.name, id: item.id })
        }
      })

      for (let i = 0; i < filterList.length; i++) {
        const item = filterList[i];
        getSongMenu(item.id).then(res => {
          ctx[songMenuMap[item.name]] = res.playlist
        })
      }
    }
  }
})


export default store