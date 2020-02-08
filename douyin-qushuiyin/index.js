const express = require('express')
const app = express()
const superagent = require('superagent');

const reptileUrl = 'http://v.douyin.com/xQnksY/';

superagent.get(reptileUrl).end(function (err, res) {
  // 抛错拦截
   if(err){
      return console.log(err);
   }
  // 等待 code
  console.log(res)
});