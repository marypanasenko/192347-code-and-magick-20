'use strict';
(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  var shuffleArray = function (array) {
    var copy = [];
    var n = array.length;
    var i;
    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * n--);
      // And move it to the new array.
      copy.push(array.splice(i, 1)[0]);
    }
    return copy;
  };
  window.util = {
    shuffleArray: shuffleArray,
    getRandomInt: getRandomInt
  };
})();


