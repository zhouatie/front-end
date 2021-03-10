<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>
      这里是另外一个package导出的sum方法计算结果 1+2 =
      <span style="color: red">{{ sum(1, 2) }}</span>
    </h1>
    <HelloWorld msg="这个页面是app1" />
  </div>
</template>

<script>
import HelloWorld from 'UI';
import sum from 'utils';
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  methods: {
    sum,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
