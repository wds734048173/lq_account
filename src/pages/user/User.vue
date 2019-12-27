<template>
  <div class="userWrap">
    <router-view/>
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
  .userWrap{
    width: 300px;
    text-align: center;
    margin: 0 auto;
    .other-type{
      display: flex;
      justify-content: space-between;
    }
    .change-login{
      margin-top: 12px;
      text-align: right;
      a:last-child{
        margin-left: 30px;
      }
    }
  }
</style>