'use strict';

(function () {
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
  window.error = {
    init: backendError,
    destroy: backendErrorClose
  };
})();
