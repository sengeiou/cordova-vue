/*
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 19:51:40
 */
import Vue from 'vue'
import Router from 'vue-router'
//错误页面
import ErrorPage from '@/components/error'
//登录
import Login from '@/pages/Login'
//根
import Index from '@/components/Index'
//四模块
import MAP from '@/pages/Map'
import WEATHER from '@/pages/Weather'
import HISTORY from '@/pages/History'
import SETTING from '@/pages/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
        //四模块
        {
          path: '/map',
          name: 'MAP',
          component: MAP
        },
        {
          path: '/weather',
          name: 'WEATHER',
          component: WEATHER,
        },
        {
          path: '/history',
          name: 'HISTORY',
          component: HISTORY
        },
        {
          path: '/setting',
          name: 'SETTING',
          component: SETTING
        },
        {
          path: '/error',
          name: 'ErrorPage',
          component: ErrorPage,
        },
      ]
    },
    
  ]
})
