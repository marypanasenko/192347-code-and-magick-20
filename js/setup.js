'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SENAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var renderWizard = function (name, sename, coatColor, eyesColor) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  var nameSename = name + ' ' + sename;

  wizardElement.querySelector('.setup-similar-label').textContent = nameSename;
  wizardElement.querySelector('.wizard-coat').style.fill = coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = eyesColor;

  return wizardElement;
};
var partsOfWizard = function (part) {
  return part[getRandomInt(0, part.length)];
};
var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(partsOfWizard(WIZARD_NAMES), partsOfWizard(SENAME), partsOfWizard(COAT_COLOR), partsOfWizard(EYES_COLOR)));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

