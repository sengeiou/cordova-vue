<!--
 * @Descripttion:
 * @version:
 * @Author: wyx
 * @Date: 2020-12-08 18:17:03
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-09 20:07:26
-->
<template>
  <div>
    <mu-tabs :value.sync="active" center color="#e0f2f1" indicator-color="#004d40" full-width>
      <mu-tab>
        <mu-icon value="cloud" color="#004d40"></mu-icon></mu-tab>
      <mu-tab>
        <mu-icon value="favorite" color="#004d40"></mu-icon></mu-tab>
      <mu-tab>
        <mu-icon value="person_pin" color="#004d40"></mu-icon></mu-tab>
    </mu-tabs>

    <div class="demo-text" v-if="active === 0">
      <p>天气页面</p>
      <!-- <router-view></router-view> -->
    </div>
    <div class="demo-text" v-if="active === 1">
      <mu-carousel hide-indicators="true">
        <mu-carousel-item>
          <mu-card-media class="everypic" title="每日一图" :sub-title="pic_cpr1">
            <img :src="pic_url1">
          </mu-card-media>
        </mu-carousel-item>
        <mu-carousel-item>
          <mu-card-media class="everypic" title="每日一图" :sub-title="pic_cpr2">
            <img :src="pic_url2">
          </mu-card-media>
        </mu-carousel-item>
        <mu-carousel-item>
          <mu-card-media class="everypic" title="每日一图" :sub-title="pic_cpr3">
            <img :src="pic_url3">
          </mu-card-media>
        </mu-carousel-item>
        <mu-carousel-item>
          <mu-card-media class="everypic" title="每日一图" :sub-title="pic_cpr4">
            <img :src="pic_url4">
          </mu-card-media>
        </mu-carousel-item>
      </mu-carousel>

      <div style="background-color:#e0f2f1;height:800px;width:100%;">

      </div>
    </div>
    <div class="demo-text" v-if="active === 2">
      <div class="searchBar">
        <mu-form ref="form" :model="validateForm" inline >
            <mu-text-field v-model="validateForm.cityname" style="margin-top:20px;margin-left:20px;"></mu-text-field>
            <mu-button color="#004d40" @click="submit" style="margin-top:20px;">查询</mu-button>
        </mu-form>
      </div>
      <mu-paper :z-depth="1" style="margin:8px">
        <mu-data-table :columns="columns" :data="list">
          <template slot-scope="scope">
            <td>{{scope.row.date}}</td>
            <td>{{scope.row.high}}</td>
            <td>{{scope.row.low}}</td>
            <td>{{scope.row.type}}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      active: 0,
      validateForm:{
        cityname:'',
      },
      one:'',
      two:'',
      three:'',
      four:'',
      pic_url1:'',
      pic_cpr1:'',
      pic_url2:'',
      pic_cpr2:'',
      pic_url3:'',
      pic_cpr3:'',
      pic_url4:'',
      pic_cpr4:'',
      sort: {
        name: '',
        order: 'asc'
      },
      columns: [
          { title: '日期', width: 120, name: 'date',align: 'center'},
          { title: '最高温(℃)', name: 'high', width: 120, align: 'center'},
          { title: '最低温(℃)', name: 'low', width: 120, align: 'center'},
          { title: '天气', name: 'type', width: 120, align: 'center'},
      ],
      list: []
    }
  },
  mounted() {
    this.getPicture();
  },
  methods:{
    submit() {
      var url = 'http://wthrcdn.etouch.cn/weather_mini?city='+this.validateForm.cityname;
      // var url = '/apiWeather/weather_mini?city='+this.validateForm.cityname;
      this.$axios({
        method:'get',
        url:url,
      }).then((response) => {
        response = response.data;
        this.list = response.data.forecast;
        console.log(this.list)
      }).catch((error) => {
        console.log(error)
      });
    },
    getPicture() {
      this.$axios({
        method: 'post',
        url:'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN',
        // url:'/apiPicture/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN',
      }).then((response) => {
        response = response.data;
        this.pic_url1 = 'http://www.bing.com'+response.images[4].url;
        this.pic_cpr1 = response.images[4].copyright;
        this.pic_url2 = 'http://www.bing.com'+response.images[3].url;
        this.pic_cpr2 = response.images[3].copyright;
        this.pic_url3 = 'http://www.bing.com'+response.images[2].url;
        this.pic_cpr3 = response.images[2].copyright;
        this.pic_url4 = 'http://www.bing.com'+response.images[1].url;
        this.pic_cpr4 = response.images[1].copyright;
        console.log(response)
      }).catch((error) => {
        console.log(error)
      });
    },
    
  },

}
</script>
<style lang="less" scoped>
// .everypic {
//     margin: 10px;
// }

.demo-text {
  // padding: 16px;
  background: #fff;
  p {
    margin: 8px 0;
  }
}
.mu-carousel {
  height: 210px;
}
</style>
