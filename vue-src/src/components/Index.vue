<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 19:54:46
-->
<template>
  <div>
    <router-view/>
    <mu-container class="footer">
      <mu-bottom-nav :value.sync="shift" shift color="rgba(0,0,0,0.1)">
        <mu-bottom-nav-item to="/map" value="nav_map" title="地图" icon="beenhere"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/weather" value="nav_weather" title="天气" icon="cloud"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/history" value="nav_history" title="历史" icon="restore"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/setting" value="nav_setting" title="设置" icon="settings"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      shift: 'movies'
    }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    // clear:both;
    padding:0;
  }
</style>
