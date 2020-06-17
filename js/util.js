'use strict';
(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  window.util = {
    getRandomInt: getRandomInt
  };
})();


