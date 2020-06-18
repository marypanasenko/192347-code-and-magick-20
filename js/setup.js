'use strict';

(function () {
  var SETUP_POSITION_TOP = 80;
  var SETUP_POSITION_LEFT = 50;
  window.setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.setup.querySelector('.setup-close');
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var openPopup = function () {
    window.setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.classList.add('hidden');
    resetPosition();
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var resetPosition = function () {
    window.setup.style.top = SETUP_POSITION_TOP + 'px';
    window.setup.style.left = SETUP_POSITION_LEFT + '%';
  };
  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });
})();
