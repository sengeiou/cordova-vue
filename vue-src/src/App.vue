<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 10:18:25
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 18:42:25
-->
<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  mounted() {
    window.addEventListener('offline', ()=>{
     // 网络由正常常到异常时触发
     sessionStorage.locationUrl=window.location.href;
     this.$router.replace('/error')
    });
    window.addEventListener('online',()=>{
      window.location.href=sessionStorage.locationUrl
    });
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height:100vh;
  /* background-color:white; */
}
</style>
