<template>
  <div>
    <child></child>
  </div>
</template>
<script>
export default {
  beforeCreate () {
    console.log('父 beforeCreate')
  },
  created () {
    console.log('父 created')
  },
  beforeMount () {
    console.log('父 beforeMount')
  },
  mounted () {
    console.log('父 mounted')
  },
  components: {
    child: {
      render() {
        return <div>child</div>
      },
      beforeCreate () {
        console.log('子 beforeCreate')
      },
      created () {
        console.log('子 created')
      },
      beforeMount () {
        console.log('子 beforeMount')
      },
      mounted () {
        console.log('子 mounted')
      }
    }
  }
}
</script>
<style lang="less">
</style>
