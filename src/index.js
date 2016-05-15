var _ = require('lodash');

  if(!_.isString(config) && !_.isObject(config)) return null;

  //Setup vars to be used in the new storage wrapper
  var storages = [localStorage, sessionStorage];

  /*
  The data pipe works in one of two ways:
  namespace string -> paths with storage source
  object map -> paths with storage source

  From there the pipe proceeds to create the storage object map:
  paths with storage source -> storage backing wrapper -> object map
  */

  var out = _.chain(config)
  .thru(function (cfg) {
    //Validate if the input is one of two types
    if(!_.isString(cfg) && !_.isObject(cfg)) return {};

    //else return the parsed data based on the config
    // IDEA: these function should be able to be re used to add
    // new keys after they are bound though events on storage
    // that would require there be a presistant reference for the storage
    return _.isString(cfg) ?
    require('./keysFromNamespace')(cfg, storages):
    require('./keysFromObjectMap')(cfg, Storage);
  })
  .reduce(function (objMap, storageTarget, key) {
    var localValue = null;

    return Object.defineProperty(objMap, key, {
      get: function () {
        if(localValue === null) {
          localValue = JSON.parse(storageTarget.getKey(key));
        }

        return localValue;
      },
      set: function (val) {
        var jsonVal = JSON.stringify(val);
        JSON.parse(storageTarget.setKey(key, jsonVal));
        localValue = JSON.parse(jsonVal);
      }
    });
  }, {})
  .reduce(function (objMap, val, key, source) {
    _.reduce(key.split('.'), function (m, d, i, l) {
      if(i + 1 !== l.length) {
        Object.defineProperty(m, d, {
          get: function () { return source[key]; },
          set: function (x) { source[key] = x; }
        });
        return;
      }

      if(m[d] === undefined) { m[d] = {}; }
      return m[d];
    }, objMap);
  }, {})
  .value();
  return out;
}

module.exports = X;
