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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupUserNameElement = setupElement.querySelector('.setup-user-name');

var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setupMainWizardElement = setupElement.querySelector('.setup-wizard');
var setupFireballElement = setupElement.querySelector('.setup-fireball-wrap');

var inputHiddenCoatElement = setupElement.querySelector('input[name="coat-color"]');
var inputHiddenEyesElement = setupElement.querySelector('input[name="eyes-color"]');
var inputHiddenFireballElement = setupElement.querySelector('input[name="fireball-color"]');

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
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Пытался сделать, что бы окно не закрывалось когда фокус находится на форме ввода имени с помощью focus и blur, но смог только через activeElement
function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (document.activeElement !== setupUserNameElement) {
      closePopup();
    }
  }
}

function openPopup() {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup() {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
}

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserNameElement.addEventListener('invalid', function () {
  if (setupUserNameElement.validity.tooShort) {
    setupUserNameElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (setupUserNameElement.validity.tooLong) {
    setupUserNameElement.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (setupUserNameElement.validity.valueMissing) {
    setupUserNameElement.setCustomValidity('Обязательное поле');
  } else {
    setupUserNameElement.setCustomValidity(''); // Вот это зачем надо, не совсем ясно?
  }
});

// Можно было бы объединить в одну функцию два слушателя ниже, повесив один слушатель на весь блок формы, но стоит ли?
setupMainWizardElement.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('wizard-coat')) {
    evt.target.style.fill = getRandomElement(WIZARD_COAT_COLORS);
    inputHiddenCoatElement.value = getRandomElement(WIZARD_COAT_COLORS);
  } else if (evt.target.classList.contains('wizard-eyes')) {
    evt.target.style.fill = getRandomElement(WIZARD_EYES_COLORS);
    inputHiddenEyesElement.value = getRandomElement(WIZARD_EYES_COLORS);
  }
});

setupFireballElement.addEventListener('click', function () {
  setupFireballElement.style.backgroundColor = getRandomElement(WIZARD_FIREBALL_COLORS);
  inputHiddenFireballElement.value = getRandomElement(WIZARD_FIREBALL_COLORS);
});

