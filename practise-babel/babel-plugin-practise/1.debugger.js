const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");

// 源代码
const code = `
function fn() {
  console.log('debugger')
  debugger;
}
`;

// 1. 源代码解析成ast
const ast = parser.parse(code);

const visitor = {
  DebuggerStatement(path) {
    path.remove();
  }
}

// 2. 转换
traverse.default(ast, visitor);

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code)

// function fn() {
//   console.log('debugger');
// }