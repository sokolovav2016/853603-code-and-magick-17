'use strict';

var dialogElement = document.querySelector('.setup');
var dialogOpenElement = document.querySelector('.setup-open');
var dialogCloseElement = dialogElement.querySelector('.setup-close');
var inputUserNameElement = dialogElement.querySelector('.setup-user-name');
var dialogAvatarElement = dialogElement.querySelector('.upload');
var artifactsShopElement = document.querySelector('.setup-artifacts-shop');

function onPopupEscPress(evt) {
  window.util.isEscEvent(evt, closePopup);
}

function onClosePopupEnterPress(evt) {
  window.util.isEnterEvent(evt, closePopup);
}

function onInputUserNameFocus() {
  document.removeEventListener('keydown', onPopupEscPress);
  inputUserNameElement.removeEventListener('focus', onInputUserNameFocus);
  inputUserNameElement.addEventListener('blur', onInputUserNameBlur);
}

function onInputUserNameBlur() {
  document.addEventListener('keydown', onPopupEscPress);
  inputUserNameElement.addEventListener('focus', onInputUserNameFocus);
  inputUserNameElement.removeEventListener('blur', onInputUserNameBlur);
}

function onUserNameEnter() {
  if (inputUserNameElement.validity.tooShort) {
    inputUserNameElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (inputUserNameElement.validity.tooLong) {
    inputUserNameElement.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (inputUserNameElement.validity.valueMissing) {
    inputUserNameElement.setCustomValidity('Обязательное поле');
  } else {
    inputUserNameElement.setCustomValidity('');
  }
}

function openPopup() {
  dialogElement.classList.remove('hidden');
  inputUserNameElement.addEventListener('focus', onInputUserNameFocus);
  inputUserNameElement.addEventListener('invalid', onUserNameEnter);
  window.colorize.addColorize();
  dialogAvatarElement.addEventListener('mousedown', window.drag.onDialogAvatarElementDrag);
  artifactsShopElement.addEventListener('dragstart', window.drag.onElementDragstart);
  document.addEventListener('keydown', onPopupEscPress);
  dialogCloseElement.addEventListener('click', closePopup);
  dialogCloseElement.addEventListener('keydown', onClosePopupEnterPress);
}

function closePopup() {
  dialogElement.classList.add('hidden');
  inputUserNameElement.removeEventListener('focus', onInputUserNameFocus);
  inputUserNameElement.removeEventListener('invalid', onUserNameEnter);
  window.colorize.removeColorize();
  dialogAvatarElement.removeEventListener('mousedown', window.drag.onDialogAvatarElementDrag);
  window.drag.resetPosition(dialogElement);
  artifactsShopElement.removeEventListener('dragstart', window.drag.onElementDragstart);
  document.removeEventListener('keydown', onPopupEscPress);
  dialogCloseElement.removeEventListener('click', closePopup);
  dialogCloseElement.removeEventListener('keydown', onClosePopupEnterPress);
}

dialogOpenElement.addEventListener('click', function () {
  openPopup();
});

dialogOpenElement.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, openPopup);
});
