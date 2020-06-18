'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

  window.wizardsRender = {
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (name, sename, coatColor, eyesColor) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = name + ' ' + sename;
    wizardElement.querySelector('.wizard-coat').style.fill = coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor;

    return wizardElement;
  };
  var partsOfWizard = function (part) {
    return part[window.util.getRandomInt(0, part.length)];
  };
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 4; i++) {
    fragment.appendChild(renderWizard(partsOfWizard(WIZARD_NAMES), partsOfWizard(SENAME), partsOfWizard(window.wizardsRender.COAT_COLOR), partsOfWizard(window.wizardsRender.EYES_COLOR)));
  }
  similarListElement.appendChild(fragment);

  window.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
