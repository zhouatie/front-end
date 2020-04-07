<template>
  <div id="app">
    <div>{{ $store.state.a }}{{ $store.state.b }}</div>
    <div>{{ count }}</div>
    <div>count2: {{ count2 }}</div>
    <div>count3: {{ count3 }}</div>
    <div>getsname: {{ $store.getters.getsname }}</div>
    <div>getsname: {{ getsname }}</div>
    <div>getsname2: {{ getsname2 }}</div>
    <div>getsname3: {{ getsname3 }}</div>
    <div>
      <p>测试commit</p>
      <button @click="$store.commit('increment', 1)">commit mutation:increment => {{ count }}</button>
    </div>
    <div>
      <p>测试mapMutations</p>
      <button @click="increment(1)">mapMutations mutation:increment => {{ count }}</button>
      <button @click="increment2(2)">increment2 mutation:increment => {{ count }}</button>
    </div>
    <div>
      <p>测试dispatch</p>
      <button @click="$store.dispatch('actionIncrement', { count: 3 })">test dispatch ===> actionIncrement</button>
      <button @click="$store.dispatch({ type: 'actionIncrement', count: 4 })">test dispatch ===> actionIncrement</button>
      <button @click="$store.dispatch({ type: 'asyncIncrement', count: 4 })">test dispatch ===> asyncIncrement</button>
    </div>
    <div>
      <p>测试 mapActions</p>
      <button @click="actionIncrement({count: 5})">常规操作actionIncrement</button>
      <button @click="asyncIncrement({count: 6})">异步操作asyncIncrement</button>
      <button @click="actionIncrement3({count: 7})">更换名字actionIncrement3</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from './vuex';
// import { mapState, mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['count']),
    ...mapState({
      count2: 'count',
      count3: state => `${state.count} xixi`
    }),
    ...mapGetters(['getsname']),
    ...mapGetters({
      getsname2: 'getsname',
      getsname3: (state, getters) => `count: ${state.count}, getsname: ${getters.getsname}`
    })
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapMutations({
      increment2: 'increment'
    }),
    ...mapActions(['actionIncrement', 'asyncIncrement']),
    ...mapActions({
      actionIncrement3: 'actionIncrement'
    })
  },
  created() {
    console.log(this.$store.state, 'store');
  }
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
