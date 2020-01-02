<template>
  <div class="outer schoolWrap">
    <div class="left">院校端</div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'School',
  data (){
    return{
    }
  }
}
</script>

<style lang="less" scope>
@import url('~@/assets/css/account.less');

</style>