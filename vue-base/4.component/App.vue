<template>
  <div>haha{{name}}
    <son a="1" b="2" v-model="name"></son>
  </div>
</template>
<script>
import son from './son.vue'
export default {
  components: {
    son,
  },
  data () {
    return {
      name: 'zhou'
    }
  }
}
</script>
<style lang="less">
</style>
