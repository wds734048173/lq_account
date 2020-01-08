<template>
  <div class="bottom-login">
    <h1 class="title log-t">个人用户登录</h1>
    <login-form :usertype=0 @log="log"></login-form>
    <div class="wx">
      <img src="../../assets/img/wx.png" alt="">
      <router-link to="/wxlogin" class="wx-lgoin"> 微信登录 </router-link>
    </div>
    <div class="other-type">
      <p>
        <span>还没有账号? </span><router-link to="register" class="register-btn" href=""> 立即注册 </router-link>
      </p>
      <p>
        <router-link to="/school/login"> 院校登录 </router-link>
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
  name: 'UserLogin',
  components:{LoginForm},
  methods:{
    log(postData){
      console.log(postData)
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

<style lang="less" scope>
  .wx{
    text-align: center;
    img{
      height: 32px;
      width: 32px;
    }
    .wx-lgoin{
      font-size: 14px;
      font-weight: 500;
      color: rgba(102,102,102,1);
      line-height: 20px;
    }
  }
</style>