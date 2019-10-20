<template>
  <div>
    <button @click="$emit('input', 'abc')">an</button>
    <grandson v-bind="$attrs"></grandson>
  </div>
</template>
<script>
import grandson from './grandson'
export default {
  components: {
    grandson
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: ['a', 'name'],
  mounted() {
    this.$on('')
    console.log(this, 'a' )
  }
}
</script>
<style lang="less">
</style>
