'use strict';

(function () {
  var wizards = [];
  var AMOUNT_OF_WIZARD = 4;
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    wizardElement.querySelector('.setup-similar-label').innerText = wizard.name;
    return wizardElement;
  };
  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var shuffledWizards = window.util.shuffleArray(data);
    for (var i = 0; i < AMOUNT_OF_WIZARD; i++) {
      fragment.appendChild(renderWizard(shuffledWizards[i]));
    }
    similarListElement.appendChild(fragment);

    window.setup.querySelector('.setup-similar').classList.remove('hidden');
  };
  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
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
  }
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

  // var updateWizards = function () {
  //   window.render(wizards.sort(function (left, right) {
  //     var rankDiff = getRank(right) - getRank(left);
  //     if (rankDiff === 0) {
  //       rankDiff = namesComparator(left.name, right.name);
  //     }
  //     return rankDiff;
  //   }));
  // }

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


  var coatColor = 'rgb(101, 137, 164)';
  var eyesColor = 'black';
  var fireballColor = '#ee4830';
  var setupWizard = document.querySelector('.setup-wizard');
  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
  var fireballColorInput = setupFireballWrap.querySelector('input[name="fireball-color"]');
  var eyesColorInput = document.querySelector('input[name="eyes-color"]');
  var coatColorInput = document.querySelector('input[name="coat-color"]');
  var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var wizardsRender = {
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green']
  };
  var wizzardClickHandler = function (inputElement, element, colorArray, styleProperty) {
    element.addEventListener('click', function () {
      var color = colorArray[window.util.getRandomInt(0, colorArray.length)];
      element.style[styleProperty] = color;
      inputElement.value = color;
    });
  };
  var wizard = {
    onEyesChange: function (color) {},
    onCoatChange: function (color) {},
    onFireballColor: function (color) {}
  };

  setupFireballWrap.addEventListener('click', function () {
    wizard.onFireballColor(fireballColorInput.value);
  });
  wizardCoat.addEventListener('click', function () {
    wizard.onCoatChange(coatColorInput.value);
  });
  wizardEyes.addEventListener('click', function () {
    wizard.onEyesChange(eyesColorInput.value);
  });

  wizard.onEyesChange = function (color) {
    eyesColor = color;
    updateWizards();
  };

  wizard.onCoatChange = function (color) {
    coatColor = color;
    updateWizards();
  };
  wizard.onFireballColor = function (color) {
    fireballColor = color;
    updateWizards();
  };

  wizzardClickHandler(fireballColorInput, setupFireballWrap, FIREBALL_COLOR, 'backgroundColor');
  wizzardClickHandler(coatColorInput, wizardCoat, wizardsRender.COAT_COLOR, 'fill');
  wizzardClickHandler(eyesColorInput, wizardEyes, wizardsRender.EYES_COLOR, 'fill');

  window.backend.load(successHandler, errorHandler);
})();
