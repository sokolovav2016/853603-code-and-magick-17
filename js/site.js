'use strict';

(function () {
  var dialogOpenElement = document.querySelector('.setup-open');

  dialogOpenElement.addEventListener('click', window.setup.open);
  dialogOpenElement.addEventListener('keydown', window.setup.openKey);
})();
