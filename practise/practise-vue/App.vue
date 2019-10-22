<template>
  <div>hahah
    {{a}}
  </div>
</template>
<script>
/* 
  测试async 是否印象异步

  结论：async beforeMount（或其他生命周期方法）并不会影响生命周期的执行。
  有也只是这个方法内部同步执行了。如下面的this.handleWait()方法调用，用来模拟
  vue源码中触发生命周期方法created的调用。
*/
export default {
  data () {
    return {
      a: ''
    }
  },
  methods: {
    async handleWait() {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('setTimeout2')
          resolve();
        }, 1000)
      })
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  async created () {
    console.log('created1')
    await new Promise((resolve, reject) => {
      console.log('created2')
      setTimeout(() => {
        console.log('setTimeout1')
        this.a = 1
        resolve();
      }, 1000)
    })
    console.log('created3')
  },
  beforeMount () {
    console.log('beforeMount1')
    this.handleWait()
    console.log('beforeMount2')
  },
  mounted () {
    console.log('mount')
  }
}
</script>
<style lang="less">
</style>
