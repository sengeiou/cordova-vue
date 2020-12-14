/*
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-09 18:43:13
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import axios from 'axios';
import VueAMap from 'vue-amap'  


Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'bfbd904d2952fbfb2ca7ba7ae102431a',
  plugin: ['AMap.Weather','AMap.CitySearch','AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ControlBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  // v: '1.4.4',
  uiVersion: '1.1.1'// ui版本号 如果要用UI组件直接在此处添加使用的版本号就可以了，不用的话改为上句
                    // 因为下面我要用的点坐标样式需要更改，因此用了UI组件
});

/* eslint-disable no-new */
// document.addEventListener("deviceready",function(){
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
// },false);

