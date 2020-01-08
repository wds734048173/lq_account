<template>
  <div class="common-wrap link-account">
    <account-header name="找回密码">
      <template>
        <span class="gotoLogin">返回登录<a-icon type="right" /></span>
      </template>
    </account-header>
    <div class="content">
      <a-form
        class="com-form"
      >
        <a-form-item>
          <label class="tips">手机号</label>
          <a-input
            v-model="loginphone"
            autocomplete="off"
          >
          </a-input>
          <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <label class="tips">验证码</label>
            <a-input
            v-model="logincode"
            type="text"
            autocomplete="off"
          >
          </a-input>
          <button ref="code" @click="getCode" class="send-code">发送验证码</button>
          <p ref="codeErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="ok-btn" @click="foundPass">找回密码</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import AccountHeader from '@/components/AccountHeader.vue'
import base from '../../utils/base'
export default {
  name: 'FoundPass',
  data (){
    return{
      loginphone:'', //手机号
      logincode:'',  //验证码
    }
  },
  components:{AccountHeader},
  mounted(){
    this.initInputs()
  },
  methods: {
    initInputs(){
      let inputs = document.querySelectorAll('.ant-row .ant-input');
      base.MoveInputTips(inputs)
      $(inputs).on('focus', function() {
        base.FormErrorHide(this);
      })
    },
    foundPass(){
      this.$router.push('/foundPassStep2');
    },
    getCode(){
      let code = this.$refs.code;
      let phoneErr = this.$refs.phoneErr
      if(this.loginphone.trim().length>0){
        console.log(this.loginphone.trim())
        base.SendCode(code,this.timmer,60)
      }else{
        base.FormError(phoneErr,'请输入手机号');
      }
    }
  }
}
</script>

<style lang="less" scope>
@import url('../../assets/css/style.less');
.link-account{
  // .ant-form-item-children{
  //   display: initial;
  // }
}
</style>