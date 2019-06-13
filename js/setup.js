'use strict';

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
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var NUMBER_OF_WIZARD = 4;

var userDialog = document.querySelector('.setup'); // Основной блок
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Список персонажей
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item'); // Шаблон
var fragment = document.createDocumentFragment(); // Создаем пустой DOM элемент

userDialog.classList.remove('hidden'); // Показываем основной блок

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomWizards(firstName, lastName, coatColor, eyesColor) {
  var arr = [];

  for (i = 0; i < NUMBER_OF_WIZARD; i++) {
    arr.push({
      name: getRandomElement(firstName) + ' ' + getRandomElement(lastName),
      coatColor: getRandomElement(coatColor),
      eyesColor: getRandomElement(eyesColor)
    });
  }

  return arr;
}
var wizards = getRandomWizards(WIZARD_FIRST_NAMES, WIZARD_LAST_NAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true); // Копирует шаблон

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // Имя персонажа
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // Цвет мантии
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // Цвет глаз

  return wizardElement;
}

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment); // Сам fragment не имеет обертки?

userDialog.querySelector('.setup-similar').classList.remove('hidden');

