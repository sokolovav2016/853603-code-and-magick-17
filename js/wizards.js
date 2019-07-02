'use strict';

(function () {
  var NUMBER_OF_WIZARD = 4;

  function renderWizard(wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var wizardElement = wizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  }

  function renderWizards(wizards) {
    var wizardsElement = document.querySelector('.setup-similar');
    var wizardsListElement = document.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    wizardsListElement.innerHTML = '';

    for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
      fragment.appendChild(renderWizard(window.util.getRandomElement(wizards)));
    }
    wizardsListElement.appendChild(fragment);
    wizardsElement.classList.remove('hidden');
  }

  window.wizards = {
    render: renderWizards
  };
})();
