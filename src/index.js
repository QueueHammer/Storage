/* global module, window, require */
//var _ = require('underscore');

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

module.expots = Storage;