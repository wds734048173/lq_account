<template>
  <div class="enterpriseWrap">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Enterprise',
  data (){
    return{
    }
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  }
}
</script>

<style lang="less" scope>
  .enterpriseWrap{
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