<template>
  <div>
    <h1>个人用户登录</h1>
    <login-form :usertype=0 @log="log"></login-form>
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
import Qs from 'qs'
import { login } from '../../axios/api'
import LoginForm from '../../components/Login.vue'
export default {
  name: 'UserLogin',
  components:{LoginForm},
  methods:{
    log(postData){
      var _this = this;
      postData.usertype = 0;
      let data = Qs.stringify(postData)
      login(data).then(res => {
        console.log(res.data)
        let data = res.data;
        if(data.code == 200){
          _this.$message.success('登录成功')
        }else if(data.code == 201){
          _this.$message.err(data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scope>
  
</style>