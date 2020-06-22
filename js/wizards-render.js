'use strict';

(function () {
  var AMOUNT_OF_WIZARD = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();
    var shuffledWizards = window.util.shuffleArray(wizards);
    for (var i = 0; i < AMOUNT_OF_WIZARD; i++) {
      fragment.appendChild(renderWizard(shuffledWizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.setup.querySelector('.setup-similar').classList.remove('hidden');
  };
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  window.backend.load(successHandler, errorHandler);

  var formMessage = function () {
    var node = document.createElement('p');
    node.setAttribute('id', 'form-message');
    node.style = 'z-index: 100; width: 500px; margin: 0 auto; text-align: center; background-color: white; padding: 50px 0; color: #000;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = 400 + 'px';
    node.style.fontSize = '30px';

    node.textContent = 'Сохранено!';
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var deleteFormMessage = function () {
    var message = document.querySelector('#form-message');
    message.remove();
  };

  var form = window.setup.querySelector('.setup-wizard-form');
  var timeBeginMessage = 100;
  var timeEndMessage = 3000;
  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), function () {

      window.setup.classList.add('hidden');
      setTimeout(formMessage, timeBeginMessage);
      setTimeout(deleteFormMessage, timeEndMessage);
    }, errorHandler);
    evt.preventDefault();
  };
  form.addEventListener('submit', submitHandler);

  window.setup.querySelector('.setup-similar').classList.remove('hidden');
})();
