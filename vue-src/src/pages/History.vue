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
    <canvas class="background" id="container" style="width:100%"></canvas>
    {{res}}
    <div>pictureID:{{pic_id}}</div>
    <img :src="pic_decode" style="width:100%">
  </div>
</template>
<script>
import F2 from '@antv/f2';
export default {
  data() {
    return {
      pic_id:'',
      pic_code:'',
      pic_decode:'',
      res:'',
    }
  },
  mounted(){
    this.initChart();
    // this.getServer();
  },
  methods:{
    
    initChart() {
      const data = [{
        time: '12-15',
        value: 10,
        type: '高温'
      }, {
        time: '12-16',
        value: 22,
        type: '高温'
      }, {
        time: '12-17',
        value: 16,
        type: '高温'
      }, {
        time: '12-18',
        value: 26,
        type: '高温'
      }, {
        time: '12-19',
        value: 12,
        type: '高温'
      }, {
        time: '12-20',
        value: 26,
        type: '高温'
      }, {
        time: '12-21',
        value: 18,
        type: '高温'
      },{
        time: '12-15',
        value: 2,
        type: '低温'
      }, {
        time: '12-16',
        value: 15,
        type: '低温'
      }, {
        time: '12-17',
        value: 3,
        type: '低温'
      }, {
        time: '12-18',
        value: 18,
        type: '低温'
      }, {
        time: '12-19',
        value: 14,
        type: '低温'
      }, {
        time: '12-20',
        value: 12,
        type: '低温'
      }, {
        time: '12-21',
        value: 15,
        type: '低温'
      }];
      const chart = new F2.Chart({
        id: 'container',
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
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
    }
  }
    
}
</script>
<style lang="less" scoped>
#app {
    width: 100vw;
}
.background {
  background-color: rgb(158, 208, 255);
}
</style>