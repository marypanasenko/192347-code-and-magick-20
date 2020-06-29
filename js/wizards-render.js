'use strict';

(function () {
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var fireballColor = '#ee4830';
  var wizards = [];
  var AMOUNT_OF_WIZARD = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);

    var wizardElement = element.querySelector('.wizard');
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    element.querySelector('.setup-similar-label').innerText = wizard.name;
    return element;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    similarListElement.innerHTML = '';
    for (var i = 0; i < AMOUNT_OF_WIZARD; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);

    window.setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    if (wizard.fireballColor === fireballColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {},
    onFireballColor: function () {}
  };

  window.wizardColorize.setupFireballWrap.addEventListener('click', function () {
    wizard.onFireballColor(window.wizardColorize.fireballColorInput.value);
  });
  window.wizardColorize.wizardCoat.addEventListener('click', function () {
    wizard.onCoatChange(window.wizardColorize.coatColorInput.value);
  });
  window.wizardColorize.wizardEyes.addEventListener('click', function () {
    wizard.onEyesChange(window.wizardColorize.eyesColorInput.value);
  });

  wizard.onEyesChange = window.util.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  wizard.onCoatChange = window.util.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });
  wizard.onFireballColor = window.util.debounce(function (color) {
    fireballColor = color;
    updateWizards();
  });
  window.backend.load(successHandler, errorHandler);
})();
