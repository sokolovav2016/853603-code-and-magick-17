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

  var wizardsElement = document.querySelector('.setup-similar');
  var wizardsListElement = document.querySelector('.setup-similar-list');
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  function getRandomWizards(firstName, lastName, coatColor, eyesColor) {
    var arr = [];

    for (i = 0; i < NUMBER_OF_WIZARD; i++) {
      arr.push({
        name: window.util.getRandomElement(firstName) + ' ' + window.util.getRandomElement(lastName),
        coatColor: window.util.getRandomElement(coatColor),
        eyesColor: window.util.getRandomElement(eyesColor)
      });
    }

    return arr;
  }

  var wizards = getRandomWizards(WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES, window.util.WIZARD_COAT_COLORS, window.util.WIZARD_EYES_COLORS);

  function renderWizard(wizard) {
    var wizardElement = wizardTemplate.cloneNode(true); // Копирует шаблон

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // Имя персонажа
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // Цвет мантии
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // Цвет глаз

    return wizardElement;
  }

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }

  wizardsListElement.appendChild(fragment);

  wizardsElement.classList.remove('hidden');
})();
