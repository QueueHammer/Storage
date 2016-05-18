var _ = require('lodash');
var keysFromNamespace = require('../src/keysFromNamespace');

console.log('keysFromNamespace test:');

var testData = {
  'a.b': true,
  'a.c': true,
  'a.f.g': true,
  'a.f.h': true,
  'a.f.i.j.k': true,
  'b.d.f.h': true,
  'b.e.f.h': true
};

function testNamespace(namespace) {
  console.log('testing:', namespace);
  console.log(keysFromNamespace(namespace, [testData]));
}

testNamespace('a');
testNamespace('b');
testNamespace('a.f');
