(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["app"]=t():e["app"]=t()})(window,(function(){return function(e){function t(t){for(var r,a,c=t[0],i=t[1],s=t[2],l=0,p=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(t);while(p.length)p.shift()();return u.push.apply(u,s||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},u=[];function a(e){return c.p+"static/js/"+({about:"about"}[e]||e)+"."+{about:"62510674"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var u,i=document.createElement("script");i.charset="utf-8",i.timeout=120,c.nc&&i.setAttribute("nonce",c.nc),i.src=a(e);var s=new Error;u=function(t){i.onerror=i.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),u=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+u+")",s.name="ChunkLoadError",s.type=r,s.request=u,n[1](s)}o[e]=void 0}};var l=setTimeout((function(){u({type:"timeout",target:i})}),12e4);i.onerror=i.onload=u,document.head.appendChild(i)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp_name_"]=window["webpackJsonp_name_"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var f=s;return u.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),o=n.n(r);o.a},5272:function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("d3b7"),n("96cf"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("h1",[e._v("this is vue1")]),n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" | "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("router-view")],1)},u=[],a=(n("034f"),n("2877")),c={},i=Object(a["a"])(c,o,u,!1,null,null,null),s=i.exports,l=n("8c4f"),f=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("img",{attrs:{alt:"Vue logo",src:n("cf05")}}),r("HelloWorld",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},p=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello"},[n("h1",[e._v(e._s(e.msg))])])},m=[],v={name:"HelloWorld",props:{msg:String}},h=v,_=(n("5d06"),Object(a["a"])(h,d,m,!1,null,"43f48a4c",null)),b=_.exports,g={name:"home",components:{HelloWorld:b}},w=g,y=Object(a["a"])(w,f,p,!1,null,null,null),j=y.exports;r["a"].use(l["a"]);var x=[{path:"/",name:"home",component:j},{path:"/about",name:"about",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],O=x;n("83f4");n.d(t,"bootstrap",(function(){return k})),n.d(t,"mount",(function(){return A})),n.d(t,"unmount",(function(){return N})),r["a"].config.productionTip=!1;var P=null,E=null;function k(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:console.log("vue app bootstraped");case 1:case"end":return e.stop()}}))}function A(e){return regeneratorRuntime.async((function(t){while(1)switch(t.prev=t.next){case 0:console.log("props from main framework",e),P=new l["a"]({base:window.__POWERED_BY_QIANKUN__?"/vue1":"/",mode:"history",routes:O}),E=new r["a"]({router:P,render:function(e){return e(s)}}).$mount("#app");case 3:case"end":return t.stop()}}))}function N(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:E.$destroy(),E=null,P=null;case 3:case"end":return e.stop()}}))}A()},"5d06":function(e,t,n){"use strict";var r=n("5272"),o=n.n(r);o.a},"83f4":function(e,t,n){window.__POWERED_BY_QIANKUN__&&(n.p=window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__)},"85ec":function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"static/img/logo.82b9c7a5.png"}})}));
//# sourceMappingURL=app.js.map