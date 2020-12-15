<template>
  <iframe
    id="iframeContain"
    name="iframeContain"
    seamless
    scrolling="yes"
    :src="iframeURL"
  >
    您当前的浏览器不支持页面上的功能，请升级您当前的浏览器版本或使用谷歌浏览器访问当前页面
  </iframe>
</template>
<script>
export default {
  data(){
    return {
      iframeURL:'https://widget-page.qweather.net/h5/index.html?bg=1&md=0123456&lc=accu&key=41ae3e60c769469d9d872ec5a3074ff4'
    }
  }
    
}
</script>
<style lang="less" scoped>
#iframeContain{
  width: 100%;
  height: 800px;
}
</style>