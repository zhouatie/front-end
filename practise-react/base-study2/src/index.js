import React from 'react';
import ReactDOM from 'react-dom';


let element1 = (
  <div className='title' style={{ color: 'red' }}>
    world
    <div>
      ddd<i>aa</i>
    </div>
    <span>hello</span>
  </div>
);
console.log(JSON.stringify(element1, null, 2), '-------------------');
ReactDOM.render(element1, document.getElementById('root'));
