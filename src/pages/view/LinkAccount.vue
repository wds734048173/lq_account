<template>
  <!--绑定页面到底是哪个页面？？？-->
  <div class="common-wrap link-account">
    <account-header name="请关联你的蓝桥账号">
      <template>
        <span class="gotoLogin">返回登录<a-icon type="right"/></span>
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
  import {createLqtoken} from "../../common/js/createLqtoken";
  import {checkPhone} from "../../common/js/comReg";

  export default {
    name: 'linkAccount',
    data() {
      return {
        loginphone: '', //手机号
        logincode: '',  //验证码
      }
    },
    components: {AccountHeader},
    mounted() {
      let inputs = document.querySelectorAll('.ant-row .ant-input');
      base.MoveInputTips(inputs)
      $(inputs).on('focus', function () {
        base.FormErrorHide(this);
      })
    },
    methods: {
      getCode() {
        let code = this.$refs.code;
        let phoneErr = this.$refs.phoneErr;
        let loginphone = this.loginphone.trim();
        let checkPhoneResult = checkPhone(loginphone)
        if (checkPhoneResult != "") {
          base.FormError(phoneErr, checkPhoneResult);
        }
        // 需要做防刷图验证

        // 发送短信验证码
        let sendData = new FormData()
        sendData.append("loginname", this.loginname.trim())
        sendData.append("codetype", 3)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
        sendcode(sendData).then(res => {
          if (res.data.code == 200) {
            //进入读秒
            base.SendCode(code, this.timmer, 60)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.getCode()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      gotoLogin() {
        //0=个人账户 1=企业账户 2=院校账户 ，默认个人账户
        if (this.usertype == 0) {
          this.$router.push({
            path: '/user/login',
          })
        } else if (this.usertype == 1) {
          this.$router.push({
            path: '/enterprise/login',
          })
        } else {
          this.$router.push({
            path: '/school/login',
          })
        }
      }
    }
  }
</script>

<style lang="less" scope>
  @import url('../../assets/css/style.less');

  .link-account {
    .content {
      .lq-agreement {
        color: #9B9B9B;
        font-size: 14px;

        a {
          color: #3E82FF;
        }
      }
    }
  }
</style>
