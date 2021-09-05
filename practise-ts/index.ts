type LogFunc = (a:number|string)=>void;
let log:LogFunc;
function log1(a:number){
  console.log(a);
}
//在这里定义的参数类型兼容实际的参数类型
log = log1;

function log2(a:number|string|boolean){
  console.log(a);
}
//在这里实际的参数类型兼容定义的参数类型
log = log2;