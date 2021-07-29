const t = require('babel-types')
module.exports = function () {
  return {
    visitor: {
      ImportDeclaration(path,state={opts}) {
        console.log(path.node.specifiers, '-----------', t.isImportSpecifier(path.node.specifiers[0]));
        if (state.opts.library === 'lodash' && t.isImportSpecifier(path.node.specifiers[0])) {
          const specifiers = path.node.specifiers.map(o => {
            return t.importDeclaration([t.ImportDefaultSpecifier(o.local)], t.stringLiteral(`${state.opts.library}/${o.local.name}`))
          })
          console.log(Array.isArray(specifiers), 'arry')
          path.replaceWithMultiple(specifiers);
          
        }
      },
    },
  };
};
