var _ = require('lodash');

function UnivesalStorage(template, config) {
  if(!_.isString(template) && !_.isObject(template)) return null;

  var noCache = !!config.noCache;

  //Setup vars to be used in the new storage wrapper
  var storages = [localStorage, sessionStorage];

  /*
  The data pipe works in one of two ways:
  namespace string -> paths with storage source
  object map -> paths with storage source

  From there the pipe proceeds to create the storage object map:
  paths with storage source -> storage backing wrapper -> object map
  */

  var out = _.chain(template)
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
    _.reduce(key.split('.'), function (m, d, i, l) {
      var localValue = null;

      if(i + 1 === l.length) {
        Object.defineProperty(m, d, {
          get: function () {
            if(localValue === null || noCache) {
              localValue = JSON.parse(storageTarget.getItem(key));
            }
            return localValue;
          },
          set: function (val) {
            var jsonVal = JSON.stringify(val);
            storageTarget.setItem(key, jsonVal);
            localValue = JSON.parse(jsonVal);
          }
        });

        return; //Hard return to exit loop
      }

      if(m[d] === undefined) { m[d] = {}; }

      return m[d];
    }, objMap);

    return objMap;
  }, {})
  .value();

  return out;
}

module.exports = UnivesalStorage;
