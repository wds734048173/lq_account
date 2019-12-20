<template>
  <div>
    <h1>个人用户登录</h1>
    <login-form></login-form>
    <router-view></router-view>
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

<style scope>
  
</style>