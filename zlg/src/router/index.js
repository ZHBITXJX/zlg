import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/login1.vue'
import main from '../components/main/main.vue'
import app from '../App.vue'
import message from '../components/message/message.vue'
import firstPage from '../components/firstPage/index.vue'
import stroage from '../components/stroage/index.vue'
import zlg from '../components/zlg/index.vue'
import material from '../components/material/index.vue'
import userInfo from '../components/userInfo/index.vue'
import history from '../components/history/index.vue'
import check from '../components/check/index.vue'
import checking from '../components/acheck/index.vue'
import my from '../components/phone/my/index.vue'
import lend from '../components/phone/lend/index.vue'
import returnpage from '../components/phone/return/index.vue'
Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    component: main
  },
  {
    path: '/message',
    name: 'message',
    component: message
  },
  {
    path: '/firstPage',
    component: main,
    name: '系统页面',
    active: true,
    children: [
      {
        path: 'index',
        component: firstPage,
        name: '首页',
        icon: 'iconfont icon-homepage_fill'
      }
    ]
  },
  {
    path: '/storeInfo',
    component: main,
    name: '系统页面',
    active: false,
    children: [
      {
        path: 'index',
        component: stroage,
        name: '库房',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  }
]
export const storeRouter = [
  {
    path: '/firstPage',
    component: main,
    name: '系统页面',
    active: true,
    children: [
      {
        path: 'index',
        component: firstPage,
        name: '首页',
        icon: 'iconfont icon-homepage_fill'
      }
    ]
  },
  {
    path: '/userInfo',
    component: main,
    name: '系统页面',
    active: false,
    children: [
      {
        path: 'index',
        component: userInfo,
        name: '用户信息',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  },
  {
    path: '/zlg',
    component: main,
    name: '系统页面',
    active: false,
    children: [
      {
        path: 'index',
        component: zlg,
        name: '重力柜',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  },
  {
    path: '/material',
    component: main,
    name: '系统页面',
    active: false,
    children: [
      {
        path: 'index',
        component: material,
        name: '物资',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  },
  {
    path: '/history',
    component: main,
    name: '历史查询',
    active: false,
    children: [
      {
        path: 'index',
        component: history,
        name: '历史查询',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  },
  {
    path: '/check',
    component: main,
    name: '待送检列表',
    active: false,
    children: [
      {
        path: 'index',
        component: check,
        name: '待送检列表',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  },
  {
    path: '/checking',
    component: main,
    name: '送检列表',
    active: false,
    children: [
      {
        path: 'index',
        component: checking,
        name: '送检列表',
        icon: 'iconfont icon-manage_fill'
      }
    ]
  }
]
export const userRouter = [
  {
    path: '/app',
    component: app,
    children: [
      {
        path: 'lend',
        component: lend
      }
    ]
  },
  {
    path: '/my',
    name: '个人中心',
    component: my
  },
  {
    path: '/lend',
    name: '借工具',
    component: lend
  },
  {
    path: '/return',
    name: '还工具',
    component: returnpage
  }
]
export default new Router({
  mode: 'history',
  routes: [
    ...router,
    ...storeRouter,
    ...userRouter
  ]
})
