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
    <mu-card-media class="everypic" title="每日一图" :sub-title="pic_cpr">
      <img :src="pic_url">
    </mu-card-media>
    <div class="searchBar">
      <mu-form ref="form" :model="validateForm" inline style="margin-top:20px;">
          <mu-text-field v-model="validateForm.cityname" style="margin-left:20px;"></mu-text-field>
          <mu-button color="primary" @click="submit">查询</mu-button>
      </mu-form>
    </div>
    <mu-container>
      <mu-paper :z-depth="1">
        <mu-data-table :columns="columns" :data="list">
          <template slot-scope="scope">
            <td>{{scope.row.date}}</td>
            <td>{{scope.row.high}}</td>
            <td>{{scope.row.low}}</td>
            <td>{{scope.row.type}}</td>
          </template>
        </mu-data-table>
      </mu-paper>
    </mu-container>
    
  </div>
</template>
<script>
export default {
  data(){
    return{
      validateForm:{
        cityname:'',
      },
      one:'',
      two:'',
      three:'',
      four:'',
      pic_url:'',
      pic_cpr:'',
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
        this.pic_url = 'http://www.bing.com'+response.images[4].url;
        this.pic_cpr = response.images[4].copyright;
        console.log(response)
      }).catch((error) => {
        console.log(error)
      });
    },
    
  },

}
</script>
<style lang="less" scoped>
.everypic {
    margin: 10px;
}
</style>
