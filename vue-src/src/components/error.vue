<template>
  <div id="app">
    <div class="main">
      <img class="img" src="../assets/error.png" alt="">
      <p class="text">网络连接出错...</p>
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
.main {
  .img {
    margin-top: 30vh;
    width: 50vw;
  }
  .text {
    margin-top: 3vh;
    font-size: 20px;
    color:grey
  }
}

</style>