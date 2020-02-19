<template>
  <div class="homePage">
    <div class="outer userWrap">
      <div class="session-sidebox">
        <img class="logo" src="~@/assets/img/lq-logo.png" alt="蓝桥">
        <div class="content">
          <img src="~@/assets/img/user-pic.png" alt="">
          <p class="t">大学生成长平台</p>
          <p class="text">大学生进入TMT行业的职业<br/>经纪人</p>
        </div>
      </div>
      <div class="session-form">
        <div class="bottom-login">
          <h1 class="reg-t title">个人用户注册</h1>
          <register-form @register="register" :usertype=0></register-form>
          <div class="other-type">
            <p>
              <span>已有账号? </span>
              <router-link to="/user/login"> 登录</router-link>
            </p>
            <p>
              <router-link to="/school/register"> 院校注册</router-link>
              <span class="line">|</span>
              <router-link to="/enterprise/register"> 企业注册</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!--<div class="bottom-login">
      <h1 class="reg-t title">个人用户注册</h1>
      <register-form @register="register" :usertype=0></register-form>
      <div class="other-type">
        <p>
          <span>已有账号? </span>
          <router-link to="login"> 登录</router-link>
        </p>
        <p>
          <router-link to="/school/register"> 院校注册</router-link>
          <span class="line">|</span>
          <router-link to="/enterprise/register"> 企业注册</router-link>
        </p>
      </div>
    </div>-->
  </div>
</template>

<script>
  import Qs from 'qs'
  import {register} from '../../axios/api'
  import RegisterForm from '../../components/Register.vue'
  import {createLqtoken} from "../../common/js/createLqtoken";
  import {fetch} from "../../axios/fetch";

  export default {
    name: 'UserRegister',
    data() {
      return {}
    },
    components: {RegisterForm},
    methods: {
      register(postData) {
        postData.usertype = 0;
        let data = Qs.stringify(postData);
        register(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success('注册成功')
            let urls = res.data.urls;
            for (let index in urls) {
              fetch({url: urls[index], methods: 'get'})
            }
            // 跳转到backurl
            setTimeout(function () {
              window.location.href = this.$store.state.com.backurl
            }, 1000)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.register(postData)
            }
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scope>

</style>
