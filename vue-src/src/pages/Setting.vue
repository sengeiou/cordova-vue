<!--
 * @Descripttion: 
 * @version: 
 * @Author: wyx
 * @Date: 2020-12-08 18:17:15
 * @LastEditors: wyx
 * @LastEditTime: 2020-12-08 19:49:48
-->
<template>
  <div id="app">
    <!-- 用户信息头 -->
    <mu-card>
      <!-- <div style="background-color:#e0f2f1"> -->
      <div>
        <mu-card-header :title="username">
        <mu-avatar slot="avatar">
          <img src="../assets/logo.png">
        </mu-avatar>
      </mu-card-header>
      </div>
    </mu-card>

    <!-- 具体设置部分 -->
    <!-- 用户设置 -->
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel1'" @change="toggle('panel1')">
      <div slot="header">用户信息</div>
      <p>用户名：{{username}}</p>
      <p>昵&nbsp;&nbsp;&nbsp;&nbsp;称：{{nickname}}</p>
      <!-- <mu-button slot="action" flat>Cancel</mu-button> -->
      <mu-button slot="action" flat color="#004d40" @click="modifyUserInfo">修改信息</mu-button>
    </mu-expansion-panel>
    <!-- 城市信息 -->
    <mu-expansion-panel class="column_panel" :zDepth=0 :expand="panel === 'panel2'" @change="toggle('panel2')">
      <div slot="header">城市信息</div>
      <div class="cityselectInfo">
        <p style="color:#004d40">当前城市：{{nowProvince}} {{nowCity}}</p>
        <p>选择城市：{{addressProvince}} {{addressCity}}</p>
      </div>
      <div>
        <mu-slide-picker style="font-size:10px" :slots="addressSlots" :visible-item-count="3" @change="addressChange" :values="address"></mu-slide-picker>
      </div>
      <mu-button slot="action" flat>取 消</mu-button>
      <mu-button slot="action" flat color="#004d40" @click="saveCityInfo">保 存</mu-button>
    </mu-expansion-panel>
    <!-- 历史 -->
    <mu-expansion-panel :zDepth=0 :expand="panel === 'panel3'" @change="toggle('panel3')">
      <div slot="header">历史设置</div>
        <p style="color:#004d40;font-size:15px">当前可见天数：{{visibleDay}}</p>
        <div style="display:flex;" >
          <span style="height:40px;line-height:40px;font-size:15px">修改可见天数：</span>
          <mu-text-field style="width:200px" underline-color='#009688' v-model="visible_day"></mu-text-field>
        </div>
      <mu-button slot="action" flat color="#004d40" @click="changeHistory">保 存</mu-button>
    </mu-expansion-panel>
    <!-- 自动登录 -->
    <mu-expansion-panel class="loginsetting" :zDepth=0 :expand="panel === 'panel4'" @change="toggle('panel4')">
      <div slot="header">登录设置</div>
      在下次打开App时免去登录操作
      <mu-list-item-action button @click="autoLogin">
        <mu-switch v-model="events" readonly></mu-switch>
      </mu-list-item-action>
    </mu-expansion-panel>
    <!-- <mu-divider></mu-divider> -->

    <!-- 忘记密码 -->
    <mu-dialog title="修改密码" width="600" max-width="80%" :esc-press-close="false" :overlay-close="false" :open.sync="openAlert">
      <mu-text-field underline-color='#009688' 
        v-model="fo_password"
          placeholder="请输入您的新密码"
          prop="fo_password"
      ></mu-text-field>
      <mu-button slot="actions" flat color="#009688" @click="closeAlertDialog">取消</mu-button>
      <mu-button slot="actions" flat color="#009688" @click="saveNewPassword">确定</mu-button>
    </mu-dialog>
  </div>
</template>
<script>
import global_ from '../components/global';
const address = {
  '北京': ['北京'],
  '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
  '上海': ['上海'],
  '天津': ['天津'],
  '重庆': ['重庆'],
  '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
  '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
  '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
  '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
  '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
  '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
  '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
  '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
  '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
  '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
  '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
  '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
  '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
  '香港': ['香港'],
  '澳门': ['澳门'],
  '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
}
export default {
  data(){
    return{
      events: false,
      panel: '',
      //city picker
      addressSlots: [
        {
          width: '30%',
          textAlign: 'center',
          values: Object.keys(address)
        }, {
          width: '30%',
          textAlign: 'center',
          values: ['北京']
        }
      ],
      nowProvince:global_.g_addressProvince,
      nowCity:global_.g_addressCity,
      address: ['北京','北京'],
      addressProvince: '北京',
      addressCity: '北京',

      // 用户信息
      username:'',
      nickname:'',
      password:'',
      openAlert: false,
      fo_password:'',
      //历史设置
      visibleDay:global_.g_visibleDay,
      visible_day:'',

    }
  },
  mounted(){
    this.getUserInfo();
    this.checkAutoButton();
  },
  methods:{
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel;
    },
    addressChange (value, index) {
      switch (index) {
        case 0:
          this.addressProvince = value
          const arr = address[value]
          this.addressSlots[1].values = arr
          this.addressCity = arr[0]
          break
        case 1:
          this.addressCity = value
          break
      }
      this.address = [this.addressProvince, this.addressCity]
    },
    saveCityInfo() {
      //更新全局变量
      global_.setAddressProvince(this.addressProvince)
      global_.setAddressCity(this.addressCity)
      //用全局变量更新当前值
      this.nowProvince=global_.g_addressProvince
      this.nowCity=global_.g_addressCity
      //转换字符串
      global_.addressToString();
      //请求城市，得到经纬度，更新全局变量经纬度
      var url = 'https://restapi.amap.com/v3/geocode/geo?output=JSON&key=af31dcfd8e52be6c756ef9f8d5e4a566&address='+global_.g_addressString+'&city='+global_.addressCity;
      this.$axios({
        method:'get',
        url: url,
        // url:'https://restapi.amap.com/v3/geocode/geo?output=JSON&key=af31dcfd8e52be6c756ef9f8d5e4a566&address=天津省天津市&city=天津市',
      }).then((response) => {
        response = response.data;
        var tmp = response.geocodes[0].location.split(',');
        global_.g_targetPoint[0]=parseFloat(tmp[0]);
        global_.g_targetPoint[1]=parseFloat(tmp[1]);
        console.log('设置页城市变更=>',global_.g_addressCity,global_.g_targetPoint,response)
      }).catch((error) => {
        console.log(error)
      });
      //格式化时间-存到数据库
      function zeroFill(i){
        if (i >= 0 && i <= 9) {
          return "0" + i;
        } else {
          return i;
        }
      }
      var date = new Date();//当前时间
      var month = zeroFill(date.getMonth() + 1);//月
      var day = zeroFill(date.getDate());//日
      var hour = zeroFill(date.getHours());//时
      var minute = zeroFill(date.getMinutes());//分
      var second = zeroFill(date.getSeconds());//秒
      //当前时间
      var curTime = date.getFullYear() + "-" + month + "-" + day
              + " " + hour + ":" + minute + ":" + second;
      this.$axios.get('http://47.114.46.42:3001/insertcity',{
      // this.$axios.get('/apiLogin/insertcity',{
        params: {
          city: global_.g_addressCity,
          time: curTime,
        },
      }).then((response) => {
        response = response.data;
        console.log('插入城市后返回三个结果',response)
      }).catch((error) => {
        console.log(error)
      });
    },
    getUserInfo() {
      this.$axios({
        method:'get',
        url:'http://47.114.46.42:3001/login',
        // url: '/apiLogin/login',
      }).then((response) => {
        response = response.data[0];
        // console.log('登录请求返回结果',response)
        this.username = response.username;
        this.nickname = response.nickname;
        this.password = response.password;
      }).catch((error) => {
        console.log(error)
      });
    },
    modifyUserInfo() {
      this.openAlert = true;
    },
    closeAlertDialog () {
      this.openAlert = false;
    },
    saveNewPassword(){
      this.$axios.get('http://47.114.46.42:3001/modifypassword',{
      // this.$axios.get('/apiLogin/modifypassword',{
        params: {
          username: this.username,
          nickname: this.nickname,
          password: this.fo_password,
        },
      }).then((response) => {
        response = response.data[0];
        console.log('密码修改返回结果',response)
        this.openAlert = false;
        //如果开启自动登录，则更新localstorage
        if(this.events){
          window.localStorage.setItem('username', this.username);
          window.localStorage.setItem('password', this.password);
        }
      }).catch((error) => {
        console.log(error)
      });
    },
    checkAutoButton(){
      if((window.localStorage.getItem('username')!=null)
          && (window.localStorage.getItem('password'))!=null){
            this.events=true;
        }
    },
    autoLogin(){
      this.events = !this.events;
      if(this.events){
        window.localStorage.setItem('username', this.username);
        window.localStorage.setItem('password', this.password);
      }else{
        window.localStorage.removeItem('username');
        window.localStorage.removeItem('password');
      }
    },
    changeHistory() {
      if(this.visible_day>7) {
        this.visible_day = 7
      }
      if(this.visible_day<2) {
        this.visible_day=2
      }
      global_.setVisibleDay(this.visible_day)
      this.visibleDay = global_.g_visibleDay;
    }
  }
    
}
</script>
<style lang="less" scoped>
/deep/.mu-card {
    background-color: rgb(224, 242, 241);
}
/deep/.mu-card-header {
    text-align: left;
    padding: 32px;
    .mu-card-title {
      color: #004d40;
      font-size: 22px;
    }
}
/deep/.mu-expansion-panel-content {
  display: flex;
  justify-content: space-between;
  text-align: left;
}
/deep/.demo-picker-container{
  width: 256px;
}
/deep/.mu-slide-picker-item {
  font-size: 16px;
}
.loginsetting {
  /deep/.mu-expansion-panel-container{
    /deep/.mu-expansion-panel-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

}
/deep/.mu-expansion-panel-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cityselectInfo {
  font-size: 15px;
}
</style>