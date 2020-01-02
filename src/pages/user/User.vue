<template>
  <div class="outer userWrap">
    <div class="left">用户端</div>
    <div class="right">
      <router-view/>
    </div>
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

<style lang="less" scope>
@import url('~@/assets/css/account.less');

</style>