'use strict';

(function () {
  var WIZARD_FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var mainWizardCoatElement = document.querySelector('.wizard-coat');
  var mainWizardEyesElement = document.querySelector('.wizard-eyes');
  var fireballElement = document.querySelector('.setup-fireball-wrap');

  var inputCoatElement = document.querySelector('input[name="coat-color"]');
  var inputEyesElement = document.querySelector('input[name="eyes-color"]');
  var inputFireballElement = document.querySelector('input[name="fireball-color"]');

  function onElementColorClick(element, elementValue, arr) {
    var color = window.util.getRandomElement(arr);

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = color;
    } else {
      element.style.fill = color;
    }

    elementValue.value = color;
  }

  function onWizardCoatClick() {
    onElementColorClick(mainWizardCoatElement, inputCoatElement, window.util.WIZARD_COAT_COLORS);
  }

  function onWizardEyesClick() {
    onElementColorClick(mainWizardEyesElement, inputEyesElement, window.util.WIZARD_EYES_COLORS);
  }

  function onFireballClick() {
    onElementColorClick(fireballElement, inputFireballElement, WIZARD_FIREBALL_COLORS);
  }

  window.colorize = {
    addColorize: function () {
      mainWizardCoatElement.addEventListener('click', onWizardCoatClick);
      mainWizardEyesElement.addEventListener('click', onWizardEyesClick);
      fireballElement.addEventListener('click', onFireballClick);
    },

    removeColorize: function () {
      mainWizardCoatElement.removeEventListener('click', onWizardCoatClick);
      mainWizardEyesElement.removeEventListener('click', onWizardEyesClick);
      fireballElement.removeEventListener('click', onFireballClick);
    }
  };
})();
