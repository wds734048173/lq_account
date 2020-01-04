<template>
  <div class="outer userWrap">
    <div class="left">
      <img class="logo" src="~@/assets/img/lq-logo.png" alt="蓝桥">
      <div class="content">
        <img src="~@/assets/img/user-pic.png" alt="">
        <p class="t">大学生成长平台</p>
        <p class="text">大学生进入TMT行业的职业<br/>经纪人</p>
      </div>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/Login.vue'
export default {
  name: 'User',
  data (){
    return{
    }
  },
  components:{LoginForm}
}
</script>

<style lang="less" scope>
@import url('~@/assets/css/account.less');

</style>