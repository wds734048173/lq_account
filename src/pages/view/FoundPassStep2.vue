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
          <label class="tips">新密码</label>
          <a-input
            v-model="password"
            type="password"
            autocomplete="off"
          >
          </a-input>
          <p ref="passErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <label class="tips">再次输入密码</label>
            <a-input
            v-model="repass"
            type="password"
            autocomplete="off"
          >
          </a-input>
          <p ref="repassErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="ok-btn" @click="onOk">确定</a-button>
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
      password:'',
      repass:'',
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
    onOk(){
      this.$message.info('确定')
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