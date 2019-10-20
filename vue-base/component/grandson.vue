<template>
  <div>grandson</div>
</template>
<script>
export default {
  props: ['b'],
  mounted() {
    console.log(this.$attrs, 'grandson')
  }
}
</script>
<style lang="less">
</style>
