/**
 * Created by zhuzi on 2017/12/10.
 */
import {router, storeRouter} from '../../router'
const app = {
  state: {
    // 路由
    routers: router,
    stoteRouters: storeRouter,
    // 左侧栏状态
    leftbar: true,
    // 当前页面
    currentPathArray: [
      {
        path: '/firstPage/index',
        name: '首页',
        icon: 'iconfont icon-homepage_fill',
        active: true
      }
    ],
    // 弹窗状态
    isshow: false,
    isshowzlg: false,
    isshowUser: false,
    isshowmaterial: false,
    isshowimg: false,
    isshowreturnimg: false,
    strogeId: '',
    userId: '',
    user: []
  },
  mutations: {
    // 设置收缩状态
    SET_LEFTBAR: (state, expand) => {
      state.leftbar = expand
    },
    // 设置路径
    SET_PATH: (state, pathArray) => {
      state.currentPathArray = pathArray
    },
   // 关闭路径
    DELETE_PATH: (state, index) => {
      state.currentPathArray.splice(index, 1)
    },
    // 展示消息框
    SHOW_MESSAGE: (state, show) => {
      state.isshow = show
      state.isshowzlg = show
      state.isshowmaterial = show
      state.isshowUser = show
      state.isshowcheck = show
    },
    SET_ROUTER: (state, data) => {
      if (data.identity === '系统管理员') {
        if (data.data !== '') {
          state.routers = data.data
        }
      }
      if (data.identity === '库房管理员') {
        if (data.data === '') {
          console.log('yyyy')
          state.routers = state.stoteRouters
          console.log(state.routers)
        } else {
          state.routers = data.data
        }
      }
    },
    SET_IMG: (state, data) => {
      state.isshowimg = data
    },
    SET_RETURNIMG: (state, data) => {
      state.isshowreturnimg = data
    },
    SET_STROGEID: (state, data) => {
      state.strogeId = data
    },
    SET_USERID: (state, data) => {
      state.userId = data
    },
    SET_USER: (state, data) => {
      state.user = JSON.parse(JSON.stringify(data))
    }
  }
}
export default app
