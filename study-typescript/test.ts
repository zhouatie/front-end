// type ZType = 1 | 'One'|true;
// let t1:ZType = 1;
// let t2:ZType = 'One';
// let t3:ZType = true;

// console.log(t1)
// console.log(t2)
// console.log(t3)

// let name: string | number;
// console.log((name as string).length);
// console.log((name as number).toFixed(2));
// console.log((name as boolean));

// 定义函数表达式
// type GetUsernameFunction = (x:string,y:string)=>string;
// let getUsername:GetUsernameFunction = function(firstName,lastName){
//   return firstName + lastName;
// }
// 没有返回值
// function hello(name:string):void {
//   console.log('hello',name);
// }
// hello('zfpx');

// let hello2 = function (name:string):void {
//   console.log('hello2',name);
// }
// hello2('zfpx');

// 默认参数
// function ajax(url:string,method:string='GET') {
//   console.log(url,method);
// }
// ajax('/users');

// 剩余参数
// function sum(...numbers:number[]) {
//   return numbers.reduce((val,item)=>val+=item,0);
// }
// console.log(sum(1,2,3));

// function sum(...numbers:Array<number>) {
//   return numbers.reduce((val,item)=>val+=item,0);
// }
// console.log(sum(1,2,3));