'use strict';

(function () {
  var dialogElement = document.querySelector('.setup');
  var draggedItem = null;
  var dialogAvatarElement = dialogElement.querySelector('.upload');
  var artifactsBagElement = document.querySelector('.setup-artifacts');

  function elementDrag(evt, element) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      element.style.top = (element.offsetTop - shift.y) + 'px';
      element.style.left = (element.offsetLeft - shift.x) + 'px';

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      function onClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        dialogAvatarElement.removeEventListener('click', onClickPreventDefault);
      }

      if (dragged) {
        dialogAvatarElement.addEventListener('click', onClickPreventDefault);
      }

    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onArtifactsElementDragover(evt) { // кажд неск сот милсек, когд эл над зоной
    evt.preventDefault(); // ?
    return false; // ?
  }

  function onArtifactsElementDrop(evt) { // сброс эл над зоной
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);

    artifactsBagElement.removeEventListener('dragover', onArtifactsElementDragover);
    artifactsBagElement.removeEventListener('drop', onArtifactsElementDrop);
    artifactsBagElement.removeEventListener('dragenter', onArtifactsElementDragenter);
    artifactsBagElement.removeEventListener('dragleave', onArtifactsElementDragleave);
    artifactsBagElement.addEventListener('dragstart', window.drag.onElementDragstart);
  }

  function onArtifactsElementDragenter(evt) { // эл над зоной
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault(); // ?
  }

  function onArtifactsElementDragleave(evt) { // уход эл с зоны
    evt.target.style.backgroundColor = '';
    evt.preventDefault(); // ?
  }

  window.drag = {
    onDialogAvatarElementDrag: function (evt) {
      elementDrag(evt, dialogElement);
    },

    resetPosition: function (element) {
      element.style.top = '';
      element.style.left = '';
    },

    onElementDragstart: function (evt) {
      if (evt.target.tagName.toLowerCase() === 'img') {
        draggedItem = evt.target;
        evt.dataTransfer.setData('text/plain', evt.target.alt); // ?
      }

      artifactsBagElement.addEventListener('dragover', onArtifactsElementDragover);
      artifactsBagElement.addEventListener('drop', onArtifactsElementDrop);
      artifactsBagElement.addEventListener('dragenter', onArtifactsElementDragenter);
      artifactsBagElement.addEventListener('dragleave', onArtifactsElementDragleave);
    }
  };
})();
