const parser = require('@babel/parser');
const traverse = require("@babel/traverse");
const generator = require("@babel/generator");
const types = require('@babel/types');

// 源代码
const code = `
function funA() {
  console.log(1)
}
`;

// 1. 源代码解析成ast
const ast = parser.parse(code);

const visitor = {
  CallExpression(path) {
    console.log(path)
    const callee = path.node.callee;
    if (types.isMemberExpression(callee)) {
      const { object, property } = callee;
      if (types.isIdentifier(object, { name: 'console' }) && types.isIdentifier(property, { name: 'log' })) {
        const parent = path.getFunctionParent();
        const parentFunName = parent.node.id.name;
        path.node.arguments.unshift(types.stringLiteral(`from function ${parentFunName}`))
      }
    }
  }
}

// 2. 转换
traverse.default(ast, visitor);

// 3. 生成
const result = generator.default(ast, {}, code);

console.log(result.code)
