<template>
  <div class="reg-bot bottom-login">
    <h1 class="reg-t title">企业用户注册</h1>
    <register-form :usertype=1></register-form>
    <div class="other-type">
      <p>
        <span>已有账号? </span><router-link to="login"> 登录 </router-link>
      </p>
      <p>
        <router-link to="/school/register"> 院校注册 </router-link>
        <span class="line">|</span>
        <router-link to="/user/register"> 个人注册 </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import RegisterForm from '../../components/Register.vue'
export default {
  name: 'SchoolRegister',
  components:{
    RegisterForm
  }
}
</script>

<style scope>
  
</style>