<template>
  <div class="outer enterpriseWrap">
    <div class="session-sidebox">
      <img class="logo" src="~@/assets/img/lq-logo.png" alt="蓝桥">
      <div class="content">
        <img src="~@/assets/img/user-pic.png" alt="">
        <p class="t">大学生成长平台</p>
        <p class="text">大学生进入TMT行业的职业<br/>经纪人</p>
      </div>
    </div>
    <div class="session-form">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Enterprise',
  data (){
    return{
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scope>
@import url('~@/assets/css/account.less');

</style>