'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_SAVE = 'https://js.dump.academy/code-and-magick';
  var form = document.querySelector('.setup-wizard-form');

  // --------------- ERROR ---------------

  function backendError(errorMessage) {
    if (document.body.contains(document.querySelector('.error'))) {
      document.querySelector('.error').remove();
    }

    var node = document.createElement('div');
    node.className = 'error';
    node.style = 'width: 500px; height: 200px; margin-right: -250px; margin-top: -100px; display: flex; justify-content: center; align-items: center; text-content: center; z-index: 100; background-color: rgba(255, 0, 0, 0.7); border-radius: 20px;';
    node.style.position = 'absolute';
    node.style.top = '50%';
    node.style.right = '50%';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function backendErrorClose() {
    if (document.body.contains(document.querySelector('.error'))) {
      document.querySelector('.error').remove();
    }
  }

  // --------------- LOAD ---------------

  function backendLoad(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  // --------------- SAVE ---------------

  function sendForm(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  function backendSave(evt) {
    sendForm(new FormData(form), window.setup.close, backendError);
    evt.preventDefault();
  }

  // --------------- BACKEND ---------------

  window.backend = {
    load: backendLoad,
    save: backendSave,
    error: backendError,
    errorClose: backendErrorClose
  };
})();
