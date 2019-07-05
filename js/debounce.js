'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  function setDebounce(callback) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.debounce = {
    set: setDebounce
  };
})();
