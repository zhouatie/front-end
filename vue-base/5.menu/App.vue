<template>
  <div>
    <a-menu :data="data"></a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          title: '1',
          children: [
            {
              title: '1-1'
            }
          ]
        },
        {
          title: '2',
          children: [
            {
              title: '2-1'
            },
            {
              title: '2-2',
              children: [
                {
                  title: '2-2-1'
                }
              ]
            }
          ]
        },
        {
          title: '3'
        },
      ]
    }
  }
}
</script>
<style lang="less">
</style>
