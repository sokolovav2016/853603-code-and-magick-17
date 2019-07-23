'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserElement = document.querySelector('.upload input[type=file]');
  var previewElement = document.querySelector('.setup-user-pic');

  fileChooserElement.addEventListener('change', function () {
    var file = fileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
