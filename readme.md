# Unified Storage
There are many polyfill libs for web storage. None of them make storage any
easier to work with. Unified Storage does just that by providing single object
that you can use to access items from localStorage, sessionStorage, or any other
storage that you create.

## Example

```
var uStorage = require('unified-storage');

//Pass in the object model you want to use
var myStorage = uStorage({
  something: {
    value: localStorage,
    prop: localStorage
  },
  somethingElse: {
    value: sessionStorage,
    prop: sessionStorage
  }
});

//You can now access your values off of the newly created object
var myValue = myStorage.something.value;

//and can be set the same way
myStorage.something.value = myValue
```
## Extension
Any object that is inherited from `Storage` can be used. Just pass it instead of
localStorage or sessionStorage. Do it, extend it with a polyfill. I dare you.
