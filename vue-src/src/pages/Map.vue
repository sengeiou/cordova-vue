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
    <div id="container" style="height:700px"></div>
    <div class="info">
      <p id='info'></p>
    </div>
  </div>
</template>
<script>
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
          const map = new AMap.Map('container', {
            resizeEnable: true,
            zoom: this.zoom,
            center: this.center,
          });
          function showCityInfo() {
            //实例化城市查询类
            var citysearch = new AMap.CitySearch();
            //自动获取用户IP，返回当前城市
            citysearch.getLocalCity(function(status, result) {
              if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                  var cityinfo = result.city;
                  var citybounds = result.bounds;
                  
                  //地图显示当前城市
                  map.setBounds(citybounds);

                  var weather = new AMap.Weather();
                  //执行实时天气信息查询
                  weather.getLive('杭州市', function(err, data) {
                    document.getElementById('info').innerHTML = 
                        '当前城市：'+cityinfo
                        +'</br>实时：'+data.reportTime
                        +'</br>天气：'+data.weather
                        +'&nbsp;&nbsp;气温：'+data.temperature+'℃'
                        +'</br>风向：'+data.windDirection
                        +'&#9;&#9;风力：'+data.windPower;
                      // console.log(err, data);
                  });
                    
                }
              } else {
                  document.getElementById('info').innerHTML = result.info;
              }
            });
          }
          showCityInfo();

          //标注点
          var marker = new AMap.Marker({
            position:this.center//位置
          })
          map.add(marker);//添加到地图
          //缩放控件
          map.plugin(["AMap.ControlBar"],function(){
              var controlBar = new AMap.ControlBar({
                position: {top:'100px',right:'10px'},
                showZoomBar: true
              })
              map.addControl(controlBar)
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
    //获取用户所在城市信息
    // showCityInfo() {
    //   //实例化城市查询类
    //   var citysearch = new AMap.CitySearch();
    //   //自动获取用户IP，返回当前城市
    //   citysearch.getLocalCity(function(status, result) {
    //       if (status === 'complete' && result.info === 'OK') {
    //           if (result && result.city && result.bounds) {
    //               var cityinfo = result.city;
    //               var citybounds = result.bounds;
    //               document.getElementById('info').innerHTML = '您当前所在城市：'+cityinfo;
    //               //地图显示当前城市
    //               map.setBounds(citybounds);

    //               var weather = new AMap.Weather();
    //               //执行实时天气信息查询
    //               weather.getLive('杭州市', function(err, data) {
    //                   console.log(err, data);
    //               });
    //           }
    //       } else {
    //           document.getElementById('info').innerHTML = result.info;
    //       }
    //   });
    // }
  }
}
</script>
<style lang="less" scoped>
#container {
  width:100%; 
  height: 180px; 
} 
.info {
  position: fixed;
  width:20rem;
  top: 50px;
  z-index: 99;
}
</style>