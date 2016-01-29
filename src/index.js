/* global module, window, require */
var _ = require('underscore');

function WrappedStorage(backing, key, data, serializer) {
  
}

function Storage(type, key, serialization) {
  var backing = window[type + 'Storage'];
  
  if(!backing) throw {
    message: 'The storage type provided is invalid',
    name: 'InvalidStorageException'
  };
  
  var rawData = backing.getItem(key);
  
  if(!rawData) throw {
    message: 'There was no key in the specified store that matched the one provided',
    name: 'InvalidKeyError'
  };
}

Storage.types = {
  local: 'local',
  session: 'session'
};

_.each(Storage.types, function (key, value) {
  var backing = window[key + 'Storage'];
  var storageObject = _.reduce(_.keys(backing), function (m, d, i) {
    //leave empty, and if null, load.
    var data;
    
    Object.defineProperty(m, d, {
      get: function () {
        if(data) return data;
        
        data = JSON.parse(backing.getItem(d));
        return data;
      }
    });
    
    return m;
  }, { });
  
  Object.defineProperty(Storage, key, {
    value: storageObject
  });
});


module.expots = Storage;