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
      <mu-bottom-nav :value.sync="shift" shift class="footer-nav" color="#004d40e3">
        <mu-bottom-nav-item to="/map" value="nav_map" title="地图" icon="beenhere" ></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/weather" value="nav_weather" title="天气" icon="cloud"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/history" value="nav_history" title="历史" icon="restore"></mu-bottom-nav-item>
        <mu-bottom-nav-item to="/setting" value="nav_setting" title="设置" icon="settings"></mu-bottom-nav-item>

<!-- 
        <mu-drawer :open.sync="open" docked right>
          <mu-list>
            <mu-list-item button>
              <mu-list-item-title>Menu Item 1</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-title>Menu Item 2</mu-list-item-title>
            </mu-list-item>
            <mu-list-item  @click="open = false" button>
              <mu-list-item-title>Close</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-drawer>
        <mu-bottom-nav-item @click="open = !open" value="nav_setting" title="设置" icon="settings"></mu-bottom-nav-item> -->
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      open: true,
      shift: 'movies',
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
    box-shadow: 0px -3px 5px #00000042;

    .footer-nav {
      color:#ffffffa4;
    }
  }
</style>
