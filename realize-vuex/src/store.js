// import Vuex from 'vuex';
import Vuex from './vuex/index.js';
import Vue from 'vue';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    a: 1,
    b: 2,
    count: 1,
    name: 'atie'
  },
  getters: {
    getsname: state => `我叫${state.name}`
  },
  mutations: {
    increment(state, payload) {
      state.count += payload;
    }
  },
  actions: {
    actionIncrement(context, payload) {
      context.commit('increment', payload.count);
    },
    asyncIncrement(context, payload) {
      setTimeout(() => {
        context.commit('increment', payload.count);
      }, 5000);
    }
  }
});

export default store;
