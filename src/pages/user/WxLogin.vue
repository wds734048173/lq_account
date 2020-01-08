<template>
  <div class="wx-login">
    <p>微信登录</p>
    <img src="../../assets/img/succ-icon.png" alt="微信二维码">
    <div class="tip">
      <p>请使用微信扫描二维码登录<br/>“蓝桥网”</p>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/Login.vue'
export default {
  name: 'WxLogin',
  data (){
    return{
    }
  },
  components:{LoginForm}
}
</script>

<style lang="less" scope>
.wx-login{
  width: 100%;
  height: 100%;
  color: #fff;
  text-align: center;
  background:rgba(51,51,51,1);
}

</style>