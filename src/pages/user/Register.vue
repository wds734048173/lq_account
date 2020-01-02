<template>
  <div class="regWrap">
    <h1>个人用户注册</h1>
    <register-form @reg="reg" :usertype=0></register-form>
    <div class="change-login">
      <router-link to="login"> 去登录 </router-link>
      <router-link to="/enterprise/register"> 企业用户注册 </router-link>
      <router-link to="/school/register"> 院校用户注册 </router-link>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import { register } from '../../axios/api'
import RegisterForm from '../../components/Register.vue'
export default {
  name: 'UserRegister',
  data(){
    return {
      
    }
  },
  components:{ RegisterForm },
  methods:{
    reg(postData){
      var _this = this;
      postData.usertype = 0;
      let data = Qs.stringify(postData)
      register(data).then(res => {
        console.log(res.data)
        let data = res.data;
        if(data.code == 200){
          _this.$message.success('注册成功')
          this.$router.push('/user/login');
        }else {
          _this.$message.err(data.msg)
        }
      }).catch(err => {
        _this.$message.err(err)
      })
    }
  }
}
</script>

<style lang="less" scope>

</style>