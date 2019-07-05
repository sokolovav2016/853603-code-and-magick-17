'use strict';

(function () {
  var Url = {
    LOAD: 'https://js.dump.academy/code-and-magick/data',
    SAVE: 'https://js.dump.academy/code-and-magick'
  };
  var form = document.querySelector('.setup-wizard-form');

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

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1000;

    xhr.open('GET', Url.LOAD);
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

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  }

  function backendSave(evt) {
    evt.preventDefault();
    sendForm(new FormData(form), window.setup.close, window.error.init);
  }

  // --------------- BACKEND ---------------

  window.backend = {
    load: backendLoad,
    save: backendSave
  };
})();
