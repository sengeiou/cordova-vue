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
    </mu-tabs>

    <div class="demo-text" v-if="active === 0">
      <!-- https://source.unsplash.com/800x0/?encryption,girl -->
      <div class="now_weather">
        <div class="now_weather_header">
          <div class="now_city">当前城市：{{now.city}}</div>
          <div class="now_vis">能见度：{{now.vis}}Km</div>
        </div>
        <div class="now_weather_main">
          <div class="now_temp">{{now.temp}}
            <span class="now_temp_unit">℃</span>
          </div>
          <div class="now_text">{{now.text}}</div>
        </div>
        <div class="now_other">
          <div class="now_other_wind">{{now.windScale}}级
            <div class="now_other_wind_span">{{now.windDir}}</div>
          </div>
          <div class="now_other_humi">{{now.humidity}}%
            <div class="now_other_humi_span">湿度</div>
          </div>
          <div class="now_other_feel">{{now.feelsLike}}℃
            <div class="now_other_feel_span">体感温度</div>
          </div>
          <div class="now_other_pres">{{now.pressure}}Pa
            <div class="now_other_pres_span">气压</div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-text" v-if="active === 1">
      <!-- 每日一图轮播图 -->
      <mu-carousel hide-indicators>
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
      <!-- 二维码 -->
      <div class="qrcode">
        <qriously :value="link" :size="120" />
        <div class="qrcode_desc">
          <p>欢迎来到推荐页</p>
          <p>更多资讯请访问官网</p>
        </div>
      </div>
      <!-- <div style="background-color:#e0f2f1;height:800px;width:100%;"></div> -->
    </div>
    
  </div>
</template>

<script>
import global_ from '../components/global';
export default {
  data(){
    return{
      active: 0,
      //二维码
      link: 'http://www.hznu.edu.cn',
      //每日一图
      pic_url1:'',
      pic_cpr1:'',
      pic_url2:'',
      pic_cpr2:'',
      pic_url3:'',
      pic_cpr3:'',
      pic_url4:'',
      pic_cpr4:'',
      //和风天气key
      key:'66be2e4e10c346ba8989c490e6557e3e',
      //当前城市
      cityCode:'',
      now: {},
      //热门城市
      cityCode1:'',
      cityCode2:'',
      cityCode3:'',
      now1: {},
      now2: {},
      now3: {},
    }
  },
  mounted() {
    this.getCityCode();
    this.getPicture();
    this.getHotCity();
  },
  methods:{
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
    getCityCode() {
      //当前城市
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+global_.g_addressCity;
      this.$axios({
        methods:'get',
        url: url,
        // url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location='+global_.g_addressCity,
      }).then((response) => {
        response = response.data;
        this.cityCode = response.location[0].id;
        console.log('getCityCode',this.cityCode,response.location[0])
        this.getWeather(this.cityCode);
      }).catch((error) => {
        console.log(error)
      });
    },
    getWeather(cityCode) {
      var url = 'https://devapi.qweather.com/v7/weather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+cityCode;
      this.$axios({
        methods:'get',
        url: url,
        // url: '/apiWeather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+cityCode,
      }).then((response) => {
        response = response.data.now;
        this.now = response;
        this.now.city=global_.g_addressCity;
        console.log('getWeather',this.now)
      }).catch((error) => {
        console.log(error)
      });
    },
    //获取热门城市天气
    getHotCity(){
      //热门城市1-北京
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=北京';
      this.$axios({
        methods:'get',
        // url: url,
        url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=北京',
      }).then((response) => {
        response = response.data;
        this.cityCode1 = response.location[0].id;
        // 获取到id之后获取天气
        this.$axios({
          methods:'get',
          // url: 'https://devapi.qweather.com/v7/weather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode1,
          url: '/apiWeather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode1,
        }).then((response) => {
          response = response.data.now;
          this.now1 = response;
          this.now1.city='北京';
          console.log('getWeather北京',this.now1)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });

      //热门城市2-上海
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=上海'
      this.$axios({
        methods:'get',
        // url: url,
        url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=上海',
      }).then((response) => {
        response = response.data;
        this.cityCode2 = response.location[0].id;
        // 获取到id之后获取天气
        this.$axios({
          methods:'get',
          // url: 'https://devapi.qweather.com/v7/weather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode2,
          url: '/apiWeather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode2,
        }).then((response) => {
          response = response.data.now;
          this.now2 = response;
          this.now2.city='上海';
          console.log('getWeather上海',this.now2)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });
      
      //热门城市3-广东
      var url = 'https://geoapi.qweather.com/v2/city/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=广州';
      this.$axios({
        methods:'get',
        // url: url,
        url: '/apiCity/lookup?key=66be2e4e10c346ba8989c490e6557e3e&location=广州',
      }).then((response) => {
        response = response.data;
        this.cityCode3 = response.location[0].id;
        // 获取到id之后获取天气
        this.$axios({
          methods:'get',
          // url: 'https://devapi.qweather.com/v7/weather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode3,
          url: '/apiWeather/now?key=66be2e4e10c346ba8989c490e6557e3e&location='+this.cityCode3,
        }).then((response) => {
          response = response.data.now;
          this.now3 = response;
          this.now3.city='广州';
          console.log('getWeather广州',this.now3)
        }).catch((error) => {
          console.log(error)
        });
      }).catch((error) => {
        console.log(error)
      });
    }
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
.qrcode {
  display: flex;
  justify-content: space-between;
  padding: 12vw;
  .qrcode_desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.now_weather {
  padding: 3vh 0vw;
  .now_weather_header {
    display: flex;
    justify-content: space-between;
    padding: 0 5vw;
  }
  .now_weather_main{
    padding: 10vh 0vw;
    .now_temp {
      font-size: 60px;
    }
    .now_temp_unit{
      // float: left;
      position: absolute;
      padding-top: 2vh;
      font-size: 14px;
    }
    .now_text {
      font-size: 18px;
    }
  }
  .now_other {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10vw;
    font-size: 18px;
    .now_other_wind {
      .now_other_wind_span{
        font-size: 12px;
      }
    }
    .now_other_humi {
      .now_other_humi_span{
        font-size: 12px;
      }
    }
    .now_other_feel {
      .now_other_feel_span{
        font-size: 12px;
      }
    }
    .now_other_pres {
      .now_other_pres_span{
        font-size: 12px;
      }
    }
    
  }
}
</style>
