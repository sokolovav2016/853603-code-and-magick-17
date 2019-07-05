'use strict';

(function () {

  var dialogElement = document.querySelector('.setup');
  var dialogCloseElement = dialogElement.querySelector('.setup-close');
  var inputUserNameElement = dialogElement.querySelector('.setup-user-name');
  var form = document.querySelector('.setup-wizard-form');

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

  function onUserNameInput() {
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

    window.backend.load(window.similar.init, window.error.init);
    form.addEventListener('submit', window.backend.save);

    window.colorize.addListeners();

    window.drag.addPopupListeners();
    window.drag.addShopListeners();

    document.addEventListener('keydown', onPopupEscPress);
    inputUserNameElement.addEventListener('focus', onInputUserNameFocus);
    inputUserNameElement.addEventListener('invalid', onUserNameInput);
    dialogCloseElement.addEventListener('click', closePopup);
    dialogCloseElement.addEventListener('keydown', onClosePopupEnterPress);
  }

  function closePopup() {
    dialogElement.classList.add('hidden');

    form.removeEventListener('submit', window.backend.save);
    window.error.destroy();

    window.colorize.removeListeners();

    window.drag.removePopupListeners();
    window.drag.removeShopListeners();
    window.drag.reset(dialogElement);

    document.removeEventListener('keydown', onPopupEscPress);
    inputUserNameElement.removeEventListener('focus', onInputUserNameFocus);
    inputUserNameElement.removeEventListener('invalid', onUserNameInput);
    dialogCloseElement.removeEventListener('click', closePopup);
    dialogCloseElement.removeEventListener('keydown', onClosePopupEnterPress);
  }

  function openPopupKey(evt) {
    window.util.isEnterEvent(evt, window.setup.open);
  }

  window.setup = {
    open: openPopup,
    openKey: openPopupKey,
    close: closePopup
  };
})();
