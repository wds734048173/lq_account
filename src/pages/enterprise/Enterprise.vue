<template>
  <div class="outer enterpriseWrap">
    <div class="left">企业端</div>
    <div class="right">
      <router-view/>
    </div>
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
  }
}
</script>

<style lang="less" scope>
@import url('~@/assets/css/account.less');

</style>