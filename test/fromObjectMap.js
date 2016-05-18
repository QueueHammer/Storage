var _ = require('lodash');
var keysFromObjectMap = require('../src/keysFromObjectMap');

function A() {}
function B() {}

B.prototype = new A();
var b = new B();

var testData = {
  a: {
    b: b,
    c: b,
    f: {
      g: b,
      h: b,
      i: {
        j: { k: b }
      }
    }
  },
  b: {
    d: {
      f: { h: b }
    },
    e: {
      f: { h: b }
    }
  }
};

console.log('keysFromObjectMap test:');

console.log('testing: obj');
var result = keysFromObjectMap(testData, A);
console.log(result);
