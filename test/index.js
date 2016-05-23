(function() {
  //debugger;
  var _ = require('lodash');
  var newStorage = require('../src/index');

  var testData = {
    localStorage: {
      'one.two.three':'three',
      'one.two.four':'four',
      'one.five.six':'six',
    },
    sessionStorage: {
      'one.seven':'seven',
      'one.two.four':'eight',
      'one.two.nine':'nine'
    }
  };

  _.each(testData, function (data, key) {
    var s = window[key];
    s.clear();
    _.each(data, function (value, key) {
      s.setItem(key, JSON.stringify(value));
    });
  });

  var testStorage = newStorage({
    one: {
      two: {
        three: localStorage,
        four: localStorage,
        nine: sessionStorage,
      },
      five: {
        six: localStorage
      },
      seven: sessionStorage
    }
  });

  window.testStorage = testStorage;
}());
