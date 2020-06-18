'use strict';

(function () {
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var fireballColorInput = setupFireballWrap.querySelector('input[name="fireball-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var wizzardClickHandler = function (inputElement, element, colorArray, styleProperty) {
    element.addEventListener('click', function () {
      var color = colorArray[window.util.getRandomInt(0, colorArray.length)];
      element.style[styleProperty] = color;
      inputElement.value = color;
    });
  };
  wizzardClickHandler(fireballColorInput, setupFireballWrap, FIREBALL_COLOR, 'backgroundColor');
  wizzardClickHandler(coatColorInput, wizardCoat, window.wizardsRender.COAT_COLOR, 'fill');
  wizzardClickHandler(eyesColorInput, wizardEyes, window.wizardsRender.EYES_COLOR, 'fill');
})();
