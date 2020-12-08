<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 18:17:15
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 19:49:48
-->
<template>
  <div>
    <mu-list>
      <mu-list-item button :ripple="false" to="./setting/userinfo">
        <mu-list-item-action>
          <mu-icon value="修"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>用户信息</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false" to="./setting/cityinfo">
        <mu-list-item-action>
          <mu-icon value="城"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>城市信息</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-action>
          <mu-icon value="史"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>历史设置</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false" @click="events = !events">
        <mu-list-item-action>
          <mu-icon value="登"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>自动登录</mu-list-item-title>
        <mu-list-item-action>
          <mu-switch v-model="events" readonly></mu-switch>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </div>
</template>
<script>
export default {
  data(){
    return{
      events: false,
    }
  }
    
}
</script>
<style lang="less" scoped>

</style>