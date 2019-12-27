<template>
  <div>
    <h1>个人用户登录</h1>
    <login-form :usertype=0></login-form>
    <div class="other-type">
      <a class="wx-lgoin" href=""> 微信登录 </a>
      <router-link to="register" class="register-btn" href=""> 立即注册 </router-link>
    </div>
    <div class="change-login">
      <router-link to="/school/login"> 院校用户登录 </router-link>
      <router-link to="/enterprise/login"> 企业用户登录 </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/Login.vue'
export default {
  name: 'UserLogin',
  components:{LoginForm}
}
</script>

<style scope>
  
</style>