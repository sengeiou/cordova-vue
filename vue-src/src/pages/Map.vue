<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 18:16:47
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 18:18:36
-->
<template>
  <div>
    <div id="container"></div>
  </div>
</template>
<script>
// import {getCurrentPosition,currentPosition} from '../../static/cordovaplugin.js'
export default {
  data () {
    return {
        //地图相关
        zoom: 12,
        iconTheme: 'default',
        iconSOS: 'blue',
        center: [116.39, 39.9],
        currentPosition:[],
    }
  },
  mounted() {
    // this.$nextTick(function(){  //AMap is not defined
    //     this.initMap();
    // });
    setTimeout(this.initMap,500);
  },
  methods: {
    initMap() {
      // 先获取坐标点
      var onSuccess = (position) =>{
          this.center[1] = position.coords.latitude;
          this.center[0] = position.coords.longitude;

          // 获取成功后，加载地图
          //map
          var map = new AMap.Map('container', {
              zoom: this.zoom,
              center: this.center,
          });
          //标注点
          var marker = new AMap.Marker({
            position:this.center//位置
          })
          map.add(marker);//添加到地图
          //缩放控件
          AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {
              var zoomCtrl = new BasicControl.Zoom({
                      position: 'br',
                      showZoomNum: true
                  });
              map.addControl(zoomCtrl);
          });

      };
      //定位数据获取失败响应
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }
      //开始获取定位数据
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },
  }
}
</script>
<style lang="less" scoped>
#container {
  width:100%; 
  height: 180px; 
} 
</style>