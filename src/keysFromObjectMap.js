var _ = require('lodash');

function keysFromObjectMap(objectMap, parentStorage) {
  function parseKeys(namespace, outObj, obj, key) {
    if(obj instanceof parentStorage) {
      outObj[namespace + '.' + key] = obj;
      return outObj;
    }

    return _.reduce(obj, _.curry(parseKeys)(namespace ? namespace + '.' + key : key), outObj);
  }

  return _.reduce(objectMap, _.curry(parseKeys)(null), {});
}

module.exports = keysFromObjectMap;
