import axios from 'axios'
import fetch from 'isomorphic-fetch';

// import Vue from 'vue';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';

function render({ appContent, loading }) {
  const container = document.getElementById('container');
}

function genActiveRule(routerPrefix) {
  return location => location.pathname.startsWith(routerPrefix);
}

render({ loading: true });

// support custom fetch see: https://github.com/kuitos/import-html-entry/blob/91d542e936a74408c6c8cd1c9eebc5a9f83a8dc0/src/index.js#L163
const request = url =>
  fetch(url, {
    referrerPolicy: 'origin-when-cross-origin',
  });

registerMicroApps(
  [
    { name: 'react app', entry: '//localhost:7100', render, activeRule: genActiveRule('/react') },
    { name: 'react15 app', entry: '//localhost:7102', render, activeRule: genActiveRule('/15react15') },
    { name: 'vue app', entry: '//localhost:7101', render, activeRule: genActiveRule('/vue') },
    // { name: 'vue app1', entry: '//localhost:8082', render, activeRule: genActiveRule('/vue1') },
    // { name: 'vue app2', entry: '//localhost:8081', render, activeRule: genActiveRule('/vue2') },
  ],
  {
    beforeLoad: [
      app => {
        console.log('before load', app);
      },
    ],
    beforeMount: [
      app => {
        console.log('before mount', app);
      },
    ],
    afterUnmount: [
      app => {
        console.log('after unload', app);
      },
    ],
  },
  {
    fetch: request,
  },
);

setDefaultMountApp('/vue1');
runAfterFirstMounted(() => console.info('first app mounted'));

start({ prefetch: true, fetch: request });
