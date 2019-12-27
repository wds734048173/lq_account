<template>
  <div>
    <h1>企业用户登录</h1>
    <login-form :usertype=1></login-form>
    <div class="other-type">
      <router-link to="register" class="register-btn" href=""> 立即注册 </router-link>
    </div>
    <div class="change-login">
      <router-link to="/user/login"> 个人用户登录 </router-link>
      <router-link to="/school/login"> 院校用户登录 </router-link>
    </div>
  </div>
</template>

<script>
import LoginForm from '../../components/Login.vue'
export default {
  name: 'SchoolLogin',
  components:{LoginForm}
}
</script>

<style scope>
  
</style>