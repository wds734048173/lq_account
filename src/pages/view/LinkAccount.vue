<template>
  <div class="common-wrap link-account">
    <account-header name="请关联你的蓝桥账号">
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
          <a-button type="primary" class="ok-btn">注册并绑定</a-button>
        </a-form-item>
      </a-form>
      <p class="lq-agreement">注册代表你已同意 <a href="">《蓝桥用户协议》</a></p>
    </div>
  </div>
</template>

<script>
import AccountHeader from '@/components/AccountHeader.vue'
import base from '../../utils/base'
export default {
  name: 'linkAccount',
  data (){
    return{
      loginphone:'', //手机号
      logincode:'',  //验证码
    }
  },
  components:{AccountHeader},
  mounted(){
    let inputs = document.querySelectorAll('.ant-row .ant-input');
    base.MoveInputTips(inputs)
    $(inputs).on('focus', function() {
      base.FormErrorHide(this);
    })
  },
  methods: {
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
  .content{
    .lq-agreement{
      color: #9B9B9B;
      font-size: 14px;
      a{
        color: #3E82FF;
      }
    }
  }
}
</style>