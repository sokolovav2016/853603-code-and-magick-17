'use strict';

(function () {
  var WIZARD_FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var WIZARD_LAST_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var NUMBER_OF_WIZARD = 4;

  function getRandomWizards(firstNames, lastNames, coatColors, eyesColors) {
    var arr = [];

    for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
      arr.push({
        name: window.util.getRandomElement(firstNames) + ' ' + window.util.getRandomElement(lastNames),
        coatColor: window.util.getRandomElement(coatColors),
        eyesColor: window.util.getRandomElement(eyesColors)
      });
    }

    return arr;
  }

  var wizards = getRandomWizards(WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES, window.util.WIZARD_COAT_COLORS, window.util.WIZARD_EYES_COLORS);

  window.data = {
    get: wizards
  };
})();
