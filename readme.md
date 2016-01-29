# Storage

Storage is a library for making getting your data in and out of the storage in the browser easier.
The goals are simplely stated and function as a road map for it's development.
When there is a feature that you hope the project were further along with please feel free to contribute.

## Accessing storage
This is the primary purpose of the library. It will work in two ways.

### A wrapper for key / value
Calling `new Storage(local|session, key)` to create a new object that will map to the storage you defined.
The object returned will be a sealed object that you can get and set values on but not modify it's structure.
will create an object that you can get and set values on but not modify the structure.

## Managing Storage
To create a new key value in local storage or session storage user Session as an object

```
//Give the new storage session a key
var key = 'bookApp'

//Create an object that will be what you will expose through storage
var objectTemplate = {
  author: null,
  chapters: [],
  cover: {
    material: null,
    title: null,
    picture: null
  }
};

//Create the new key value pair, and it also returns a new storage object for you key
var storage = Session.local.add(key, objectTemplate);

```
