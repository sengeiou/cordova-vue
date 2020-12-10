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
    <mu-card-media title="每日一图" :sub-title="pic_cpr">
      <img :src="pic_url">
    </mu-card-media>
    <div class="searchBar">
      <mu-form ref="form" :model="validateForm" inline style="margin:20px;">
          <mu-text-field v-model="validateForm.cityname"></mu-text-field>
          <mu-button color="primary" @click="submit">查询</mu-button>
      </mu-form>
    </div>

    <mu-list>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>{{one}}</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>{{two}}</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>{{three}}</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="false">
        <mu-list-item-title>{{four}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>

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
      pic_cpr:''
    }
  },
  mounted() {
    this.getPicture();
  },
  methods:{
    submit() {
      var url = 'http://wthrcdn.etouch.cn/weather_mini?city='+this.validateForm.cityname;
      //var url = '/apiWeather/weather_mini?city='+this.validateForm.cityname;
      this.$axios({
        method:'get',
        url:url,
      }).then((response) => {
        response = response.data;
        console.log(response)
        this.one = response.data.forecast[0].date +" "
                    + response.data.forecast[0].type +" "
                    + response.data.forecast[0].high +" "
                    + response.data.forecast[0].low +" "
                    + response.data.forecast[0].fengxiang;
        this.two = response.data.forecast[1].date +" "
                    + response.data.forecast[1].type +" "
                    + response.data.forecast[1].high +" "
                    + response.data.forecast[1].low +" "
                    + response.data.forecast[1].fengxiang;
        this.three = response.data.forecast[2].date +" "
                    + response.data.forecast[2].type +" "
                    + response.data.forecast[2].high +" "
                    + response.data.forecast[2].low +" "
                    + response.data.forecast[2].fengxiang;
        this.four = response.data.forecast[3].date +" "
                    + response.data.forecast[3].type +" "
                    + response.data.forecast[3].high +" "
                    + response.data.forecast[3].low +" "
                    + response.data.forecast[3].fengxiang

        console.log(response)
      }).catch((error) => {
        console.log(error)
      });
    },
    getPicture() {
      this.$axios({
        method: 'post',
        url:'http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN',
        //url:'/apiPicture/HPImageArchive.aspx?format=js&idx=0&n=5&mkt=zh-CN',
      }).then((response) => {
        response = response.data;
        this.pic_url = 'http://www.bing.com'+response.images[4].url;
        this.pic_cpr = response.images[4].copyright;
        console.log(response)
      }).catch((error) => {
        console.log(error)
      });
    }
  },

}
</script>
<style lang="less" scoped>
</style>
