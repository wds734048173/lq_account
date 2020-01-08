<template>
  <div class="bottom-login">
    <h1 class="title log-t">院校登录</h1>
    <login-form :usertype=2 @log="log"></login-form>
    <div class="other-type">
      <p>
        <span>还没有账号? </span><router-link to="register" class="register-btn" href=""> 立即注册 </router-link>
      </p>
      <p>
        <router-link to="/user/login"> 个人用户登录 </router-link>
        <span class="line">|</span>
        <router-link to="/enterprise/login"> 企业登录 </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import { login } from '../../axios/api'
import LoginForm from '../../components/Login.vue'
export default {
  name: 'SchoolLogin',
  components:{LoginForm},
  methods:{
    log(postData){
      console.log(postData)
      var _this = this;
      postData.usertype = 2;
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