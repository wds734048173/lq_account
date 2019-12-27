<template>
  <div class="regWrap">
    <h1>个人用户注册</h1>
    <register-form :usertype=0></register-form>
    <div class="change-login">
      <router-link to="login"> 去登录 </router-link>
      <router-link to="/enterprise/register"> 企业用户注册 </router-link>
      <router-link to="/school/register"> 院校用户注册 </router-link>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../../components/Register.vue'
export default {
  name: 'UserRegister',
  components:{
    RegisterForm
  }
}
</script>

<style lang="less" scope>

</style>