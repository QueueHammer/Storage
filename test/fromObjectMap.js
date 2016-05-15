var _ = require('lodash');
var keysFromObjectMap = require('../src/keysFromObjectMap');

var testData = {
  a: {
    b: true,
    c: true,
    f: {
      g: true,
      h: true,
      i: {
        j: {
          k: true
        }
      }
    }
  },
  b: {
    d: {
      f: {
        h: true
      }
    },
    e: {
      f: {
        h: true
      }
    }
  }
};

console.log('keysFromObjectMap test:');



console.log('testing: obj');
_.each(keysFromObjectMap(testData), function (x, y) {
  console.log( y);
});
