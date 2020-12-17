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
    <div class="info">
      <p id='info'></p>
    </div>
  </div>
</template>

<script>
import global_ from '../components/global';
export default {
  data () {
    return {
        //地图相关
        zoom: 12,
        center: [120.014027,30.292638],//==========================目前无法调用cordova定位接口
        // center: [],
        currentPosition: [],
        cityName: '',      //将全局变量赋值到data里面
        targetPoint: '',
    }
  },
  mounted() {
    // this.$nextTick(function(){  //AMap is not defined
    //     this.initMap();
    // });
    setTimeout(this.initMap,500);
  },
  methods: {
    initMap(){
      // 先获取坐标点
      // var onSuccess = (position) =>{
      //     this.center[1] = position.coords.latitude;
      //     this.center[0] = position.coords.longitude;

      // this.cityName = global_.g_cityName;
      // global_.setCityName('hhhhhh')
      // this.targetPoint = global_.g_cityName;
      // console.log(1111,this.targetPoint,this.cityName)

      // 获取成功后，加载地图
      const map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: this.zoom,
        // center: this.center,
      });

      // function showCityInfo() {
        //实例化城市查询类
        var citysearch = new AMap.CitySearch();
        //自动获取用户IP，返回当前城市
        citysearch.getLocalCity(function(status, result) {
          if (status === 'complete' && result.info === 'OK') {

            //定位城市中心点，写入全局变量
            var la = (result.bounds.oc.lng-result.bounds.xc.lng)/2+result.bounds.xc.lng;
            var lo = (result.bounds.oc.lat-result.bounds.xc.lat)/2+result.bounds.xc.lat;
            var tmp=[];
            tmp[0] = la;
            tmp[1] = lo;
            global_.setTargetPoint(tmp)
            console.log(global_.g_targetPoint)
            
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
              }); 

              //标注点
              var marker = new AMap.Marker({
                position:global_.g_targetPoint//位置
              })
              map.add(marker);//添加到地图

              //===============================================

            }
          } else {
              document.getElementById('info').innerHTML = result.info;
          }
        });
      // });
      // showCityInfo();

      //缩放控件
      map.plugin(["AMap.ControlBar"],function(){
          var controlBar = new AMap.ControlBar({
            position: {top:'20vh',right:'5vw'},
            showZoomBar: true,
            showControlButton:false,
          })
          map.addControl(controlBar)
      });

      // };
      // //定位数据获取失败响应
      // function onError(error) {
      //     alert('code: '    + error.code    + '\n' +
      //           'message: ' + error.message + '\n');
      // }
      // //开始获取定位数据
      // navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }
}
</script>
<style lang="less" scoped>
#container {
  height:100vh;
  width: 100vw;
} 
.info {
  position: fixed;
  width:20rem;
  top: 50px;
  z-index: 99;
}
/deep/.amap-logo {
  z-index: -1;
}
/deep/.amap-copyright {
  z-index: -1;
}
</style>