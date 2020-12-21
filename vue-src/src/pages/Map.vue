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
        webServerKey:'af31dcfd8e52be6c756ef9f8d5e4a566',
        zoom: 8,
    }
  },
  mounted() {
    // this.$nextTick(function(){  //AMap is not defined
    //     this.initMap();
    // });
    setTimeout(this.initMap,500);
    // this.getWeather()
  },
  methods: {
    initMap(){
      if(global_.g_addressCity===''){
        //如果没有中心信息，那么显示当前定位城市
        window.map = new AMap.Map('container', {
          mapStyle: 'amap://styles/fresh', //设置地图的显示样式
          resizeEnable: true,
          zoom: this.zoom,
        });
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
            // console.log('实例化城市查询得到的中心点',global_.g_targetPoint)
            //标注点当前城市中心点
            var marker = new AMap.Marker({
              position:global_.g_targetPoint//位置
            })
            map.add(marker);//添加到地图
            
            if (result && result.city && result.bounds) {
              var cityinfo = result.city;
              var citybounds = result.bounds;
              //将城市信息写入全局变量
              global_.setAddressCity(cityinfo);
              //地图显示当前城市
              map.setBounds(citybounds);
              //执行实时天气信息查询
              var weather = new AMap.Weather();
              weather.getLive('杭州市', function(err, data) {                   
                document.getElementById('info').innerHTML = 
                    '当前城市：'+cityinfo
                    +'</br>实时：'+data.reportTime
                    +'</br>天气：'+data.weather
                    +'&nbsp;&nbsp;气温：'+data.temperature+'℃'
                    +'</br>风向：'+data.windDirection
                    +'&#9;&#9;风力：'+data.windPower;
              }); 
            }
          } else {
              document.getElementById('info').innerHTML = result.info;
          }
        });

      }
      else{
        //如果有中心点信息，显示中心点城市
        window.map = new AMap.Map('container', {
          mapStyle: 'amap://styles/fresh', //设置地图的显示样式
          center:global_.g_targetPoint,
          zoom: this.zoom,
        });
        //标注点
        var marker = new AMap.Marker({
          position:global_.g_targetPoint//位置
        })
        map.add(marker);//添加到地图
        this.getWeather();
      }

      //缩放控件
      map.plugin(["AMap.ControlBar"],function(){
          var controlBar = new AMap.ControlBar({
            position: {top:'20vh',right:'5vw'},
            showZoomBar: true,
            showControlButton:false,
          })
          map.addControl(controlBar)
      });
    },
    getWeather() {
      var url = 'https://restapi.amap.com/v3/weather/weatherInfo?city='+global_.g_addressCity+'&key='+'af31dcfd8e52be6c756ef9f8d5e4a566';
      this.$axios({
        method:'get',
        url: url,
      }).then((response) => {
        response = response.data;
        console.log(2222222,global_.g_addressCity,response)
        document.getElementById('info').innerHTML = 
                    '当前城市：'+response.lives[0].city
                    +'</br>实时：'+response.lives[0].reporttime
                    +'</br>天气：'+response.lives[0].weather
                    +'&nbsp;&nbsp;气温：'+response.lives[0].temperature+'℃'
                    +'</br>风向：'+response.lives[0].winddirection
                    +'&#9;&#9;风力：'+response.lives[0].windpower;
      }).catch((error) => {
        console.log(error)
      });
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