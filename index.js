module.exports = replaceRequire;

var acorn = require('acorn');
var walk  = require('acorn/util/walk');

function replaceRequire(src, fn) {
  var ret = src;
  var ast = acorn.parse(src, { ranges: true });
  var offset = 0;
  walk.ancestor(ast, {
    CallExpression: function (node, state) {
      if (node.callee.type === 'Identifier' && 
          node.callee.name === 'require' && node.arguments) {
        var value = src.substring(node.start, node.end);
        var update = fn(value);
        if (!update || typeof update !== 'string')
          return;
        ret = ret.substring(0, node.start + offset) + update + ret.substring(node.end + offset);
        offset += update.length - value.length;
      }
    }
  });
  return ret;
}
