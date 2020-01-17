<template>
  <div class="wx-login">
    <p class="title">微信登录</p>
    <div class="wx-pic">
      <img class="wx-img" src="" alt="微信二维码">
    </div>
    <div class="tip">
      <img src="~@/assets/img/tip-img.png" alt="扫描登录">
    </div>
  </div>
</template>

<script>
export default {
  name: 'WxLogin',
  data (){
    return{
    }
  },
}
</script>

<style lang="less" scope>
.wx-login{
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  background:rgba(51,51,51,1);
  .title{
    font-size:20px;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:28px;
    padding: 96px 0 16px;
  }
  .wx-pic{
    width: 282px;
    height: 282px;
    background:rgba(216,216,216,1);
    border:1px solid rgba(151,151,151,1);
    margin: 0 auto;
    .wx-img{
      width: 282px;
      height: 282px;
    }
  }
  .tip{
    margin-top: 30px;
    img{
      width: 283px;
    }
  }
}

</style>