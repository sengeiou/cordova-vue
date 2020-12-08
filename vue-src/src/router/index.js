/*
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 18:18:01
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MAP from '@/pages/Map'
import WEATHER from '@/pages/Weather'
import HISTORY from '@/pages/History'
import SETTING from '@/pages/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/map',
      name: 'MAP',
      component: MAP
    },
    {
      path: '/weather',
      name: 'WEATHER',
      component: WEATHER
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
    }
  ]
})
