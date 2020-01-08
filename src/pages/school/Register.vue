<template>
  <div class="reg-bot bottom-login">
    <h1 class="reg-t title">院校注册</h1>
    <register-form :usertype=2></register-form>
    <div class="other-type">
      <p>
        <span>已有账号? </span><router-link to="login"> 登录 </router-link>
      </p>
      <p>
        <router-link to="/user/register"> 个人用户注册 </router-link>
        <span class="line">|</span>
        <router-link to="/enterprise/register"> 企业注册 </router-link>
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