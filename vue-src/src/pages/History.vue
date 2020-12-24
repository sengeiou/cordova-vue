<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 18:17:11
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 19:46:32
-->
<template>
  <div class="app">
    <div class="page_title">历史城市 - 未来{{visibleDay}}天天气</div>
    <div class="card">
      <div class="background_text">{{city1}}</div>
      <!-- <div class="card_title card_title1">{{city1}}</div> -->
      <canvas class="background" id="container1" style="width:98vw;background-color:#4db6ac"></canvas>
    </div>
    <div class="card">
      <div class="background_text">{{city2}}</div>
      <!-- <div class="card_title card_title2">{{city2}}</div> -->
      <canvas class="background" id="container2" style="width:98vw;background-color:#009688"></canvas>
    </div>
    <div class="card">
      <div class="background_text">{{city3}}</div>
      <!-- <div class="card_title card_title3">{{city3}}</div> -->
      <canvas class="background" id="container3" style="width:98vw;background-color:#00796b"></canvas>
    </div>
  </div>
</template>
<script>
import F2 from '@antv/f2';
import global_ from '../components/global';
export default {
  data() {
    return {
      visibleDay:global_.g_visibleDay,
      city1:'',
      city2:'',
      city3:'',
      weather1:[],
      weather2:[],
      weather3:[],
    }
  },
  mounted(){
    this.getLastCity();
  },
  methods:{
    getLastCity() {
      // this.$axios.get('http://47.114.46.42:3001/getthreecity',{
      this.$axios.get('/apiLogin/getthreecity',{
      }).then((response) => {
        response = response.data;
        this.city1 = response[0].city;
        this.city2 = response[1].city;
        this.city3 = response[2].city;
        console.log('获取三个城市返回结果',response,this.city1,this.city2,this.city3)
        //根据城市名字获取三个城市代码和天气
        this.getCity()
      }).catch((error) => {
        console.log(error)
      });
    },
    getCity(){
      //第一个城市
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city1;
      this.$axios({
        methods:'get',
        url: url,
        // url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city1,
      }).then((response) => {
        response = response.data;
        console.log('第一个城市代码获取',response,response.location[0].id)
        //获取天气
        var url = 'https://api.qweather.com/v7/weather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id;
        this.$axios({
          methods:'get',
          url: url,
          // url: '/apicWeather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id,
        }).then((response) => {
          response = response.data;
          for(var i = 0;i<global_.g_visibleDay;i++){
            var tmp1={};
            var tmp2={};
            tmp1.time = response.daily[i].fxDate.slice(-5);
            tmp1.value = parseInt(response.daily[i].tempMax);
            tmp1.type = "高温";
            tmp2.time = response.daily[i].fxDate.slice(-5);
            tmp2.value = parseInt(response.daily[i].tempMin);
            tmp2.type = "低温";
            // console.log('第一个城市天气数据处理之后=>',1,tmp1,2,tmp2)
            this.weather1.push(tmp1,tmp2)
          }
          // console.log('数据1处理之后',this.weather1)
          this.initChart()
          // console.log('第一个城市天气总结=>',this.weather1)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });

      //第二个城市
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city2;
      this.$axios({
        methods:'get',
        url: url,
        // url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city2,
      }).then((response) => {
        response = response.data;
        console.log('第一个城市代码获取',response,response.location[0].id)
        //获取天气
        var url = 'https://api.qweather.com/v7/weather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id;
        this.$axios({
          methods:'get',
          url: url,
          // url: '/apicWeather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id,
        }).then((response) => {
          response = response.data;
          // this.weather2 = response.daily;
          for(var i = 0;i<global_.g_visibleDay;i++){
            var tmp1={};
            var tmp2={};
            tmp1.time = response.daily[i].fxDate.slice(-5);
            tmp1.value = parseInt(response.daily[i].tempMax);
            tmp1.type = "高温";
            tmp2.time = response.daily[i].fxDate.slice(-5);
            tmp2.value = parseInt(response.daily[i].tempMin);
            tmp2.type = "低温";
            this.weather2.push(tmp1,tmp2)
          }
          this.initChart2()
          console.log('数据2处理之后',this.weather2)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });

      //第三个城市
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city3;
      this.$axios({
        methods:'get',
        url: url,
        // url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.city3,
      }).then((response) => {
        response = response.data;
        console.log('第一个城市代码获取',response,response.location[0].id)
        //获取天气
        var url = 'https://api.qweather.com/v7/weather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id;
        this.$axios({
          methods:'get',
          url: url,
          // url: '/apicWeather/7d?key=5c232441fa06411eaa744c3ae1cb9ad0&location='+response.location[0].id,
        }).then((response) => {
          response = response.data;
          // this.weather3 = response.daily;
          for(var i = 0;i<global_.g_visibleDay;i++){
            var tmp1={};
            var tmp2={};
            tmp1.time = response.daily[i].fxDate.slice(-5);
            tmp1.value = parseInt(response.daily[i].tempMax);
            tmp1.type = "高温";
            tmp2.time = response.daily[i].fxDate.slice(-5);
            tmp2.value = parseInt(response.daily[i].tempMin);
            tmp2.type = "低温";
            this.weather3.push(tmp1,tmp2)
          }
          this.initChart3()
          console.log('数据3处理之后',this.weather3)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });
    },

    //=====================图表绘制
    initChart() {
      //图表1
      const chart = new F2.Chart({
        id: 'container1',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(this.weather1, {
        time: {
          range: [ 0, 1 ]
        },
        value: {
          tickCount: 3,
          formatter: function formatter(ivalue) {
            return ivalue + '℃';
          }
        }
      });
      chart.axis('time', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.axis('value', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          return textCfg;
        }
      });
      chart.axis('tem', {
        grid: function grid(text) {
          if (text === '0%') {
            return {
              lineDash: null,
              lineWidth: 1
            };
          }
        }
      });
      chart.legend({
        position: 'bottom',
        offsetY: -5
      });
      chart.line()
        .position('time*value')
        .color('white')
        .shape('type', function(type) {
          if (type === '高温') {
            return 'line';
          }
          if (type === '低温') {
            return 'dash';
          }
        });

      chart.render();
    },
    initChart2(){
      
      //图表2
      const chart2 = new F2.Chart({
        id: 'container2',
        pixelRatio: window.devicePixelRatio
      });
      chart2.source(this.weather2, {
        time: {
          range: [ 0, 1 ]
        },
        value: {
          tickCount: 3,
          formatter: function formatter(ivalue) {
            return ivalue + '℃';
          }
        }
      });
      chart2.axis('time', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart2.axis('value', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          return textCfg;
        }
      });
      chart2.axis('tem', {
        grid: function grid(text) {
          if (text === '0%') {
            return {
              lineDash: null,
              lineWidth: 1
            };
          }
        }
      });
      chart2.legend({
        position: 'bottom',
        offsetY: -5
      });
      chart2.line()
        .position('time*value')
        .color('white')
        .shape('type', function(type) {
          if (type === '高温') {
            return 'line';
          }
          if (type === '低温') {
            return 'dash';
          }
        });

      chart2.render();
    },
    initChart3(){
            
      //图表3
      const chart3 = new F2.Chart({
        id: 'container3',
        pixelRatio: window.devicePixelRatio
      });
      chart3.source(this.weather3, {
        time: {
          range: [ 0, 1 ]
        },
        value: {
          tickCount: 3,
          formatter: function formatter(ivalue) {
            return ivalue + '℃';
          }
        }
      });
      chart3.axis('time', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart3.axis('value', {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {
            fill: '#fff',       //坐标轴设为白色
          };
          return textCfg;
        }
      });
      chart3.axis('tem', {
        grid: function grid(text) {
          if (text === '0%') {
            return {
              lineDash: null,
              lineWidth: 1
            };
          }
        }
      });
      chart3.legend({
        position: 'bottom',
        offsetY: -5
      });
      chart3.line()
        .position('time*value')
        .color('white')
        .shape('type', function(type) {
          if (type === '高温') {
            return 'line';
          }
          if (type === '低温') {
            return 'dash';
          }
        });

      chart3.render();
    },
  }
    
}
</script>
<style lang="less" scoped>
#app {
    width: 100vw;
}
.page_title {
  width: 100vw;
  height: 7vh;
  background-color: #e0f2f1;
  font-size: 20px;
  font-weight: 600;
  line-height: 7vh;
  text-align: left;
  padding-left: 5vw;
  color:#003d33;
  // margin-bottom: 1vh;
  box-shadow: 0px 3px 5px #00000036;
}
.card_title {
  border-radius: 7px 7px 0px 0px;
  width: 20vw;
  height: 4vh;
  color: white;
  line-height: 4vh;
  font-size: 16px;
  font-weight: 400;
}
.card_title1 {
  background-color: #4db6ac;
}
.card_title2 {
  background-color: #009688;
}
.card_title3 {
  background-color: #00796b;
}
.background{
  border-radius: 15px 15px 15px 15px;
}
.card {
  margin: 3vh 1vw;
  .background_text{
    position: absolute;
    width: 100vw;
    // left: 0;
    margin: 0 auto;
    font-size: 120px;
    color: white;
    opacity: 0.1;
  }
}

</style>