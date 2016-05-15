var _ = require('lodash');

function keysFromNamespace(namespace, targetStorages) {

  function extractKeysFromNameSpace (namespace) {
    return function (storage) {
      var pathRegEx = RegExp('^' + namespace.replace(/\./g, '\\.') + '\\.\\w[\\w\\d-_]?');
      return _.chain(_.keys(storage))
      .filter(function (key) {
        return key.match(/\./) && !key.match(/\.\./) && pathRegEx.test(key);
      })
      .reduce(function (obj, path) {
        obj[path] = storage;
        return obj;
      }, {})
      .value();
    };
  }

  return _.chain(targetStorages)
  .map(extractKeysFromNameSpace(namespace))
  .reduce(function (obj, paths) {
    return _.assign(obj, paths);
  }, {})
  .value();
}

module.exports = keysFromNamespace;
