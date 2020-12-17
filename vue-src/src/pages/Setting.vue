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
    <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
      <div style="background-color:#e0f2f1">
        <mu-card-header title="Myron Avatar">
        <mu-avatar slot="avatar">
          <img src="../assets/logo.png">
        </mu-avatar>
      </mu-card-header>
      </div>
    </mu-card>
    
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel1'" @change="toggle('panel1')">
      <div slot="header">用户信息</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
      <mu-button slot="action" flat>Cancel</mu-button>
      <mu-button slot="action" flat color="primary">Save</mu-button>
    </mu-expansion-panel>
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel2'" @change="toggle('panel2')">
      <div slot="header">城市信息</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
    </mu-expansion-panel>
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel3'" @change="toggle('panel3')">
      <div slot="header">历史设置</div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
    </mu-expansion-panel>
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel4'" @change="toggle('panel4')">
      <div slot="header">登录设置</div>
      在下次打开App时免去登录操作
      <mu-list-item-action button @click="events = !events">
        <mu-switch v-model="events" readonly></mu-switch>
      </mu-list-item-action>
    </mu-expansion-panel>


    <!-- <mu-list>
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
    </mu-list> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      events: false,
      panel: '',
    }
  },
  methods:{
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    }
  }
    
}
</script>
<style lang="less" scoped>
/deep/.mu-card-header {
    text-align: left;
    padding: 32px;
    .mu-card-title {
      color: #004d40;
      font-size: 22px;
    }
}
/deep/.mu-expansion-panel-content {
  display: flex;
  justify-content: space-between;
  text-align: left;
}
</style>