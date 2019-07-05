'use strict';

(function () {
  var inputCoatElement = document.querySelector('input[name="coat-color"]');
  var inputEyesElement = document.querySelector('input[name="eyes-color"]');
  var coatColor = inputCoatElement.value;
  var eyesColor = inputEyesElement.value;
  var wizards = [];

  function getRank(wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  function updateWizards() {
    window.wizards.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }

      return rankDiff;
    }));
  }

  function successHandler(data) {
    wizards = data;
    updateWizards();
  }

  // Оставил для разбора, почему это не работает

  // function onCoatChange() {
  //   window.debounce(function (color) {
  //     coatColor = color;
  //     updateWizards();
  //   });
  // }

  // function onEyesChange() {
  //   window.debounce(function (color) {
  //     eyesColor = color;
  //     updateWizards();
  //   });
  // }

  // window.similar = {
  //   init: successHandler,
  //   coatChange: onCoatChange,
  //   eyesChange: onEyesChange
  // };

  window.similar = {
    init: successHandler,
    coatChange: window.debounce.set(function (color) {
      coatColor = color;
      updateWizards();
    }),
    eyesChange: window.debounce.set(function (color) {
      eyesColor = color;
      updateWizards();
    })
  };
})();
