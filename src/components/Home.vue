<template>
  <div class="homePage">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
    }
  },
  methods: {
    callback(key) {
      console.log(key);
    },
  }
}
</script>

<style scoped>
</style>
