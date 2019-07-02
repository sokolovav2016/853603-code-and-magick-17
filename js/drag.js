'use strict';

(function () {
  var draggedItem = null;
  var dialogAvatarElement = document.querySelector('.upload');
  var artifactsBagElement = document.querySelector('.setup-artifacts');
  var artifactsShopElement = document.querySelector('.setup-artifacts-shop');

  // --------------- ПЕРЕМЕЩЕНИЕ ПОПАПА ---------------

  function elementDrag(evt, dragElement, dragByElement) {
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

      dragElement.style.top = (dragElement.offsetTop - shift.y) + 'px';
      dragElement.style.left = (dragElement.offsetLeft - shift.x) + 'px';

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      function onClickPreventDefault(clickEvt) {
        clickEvt.preventDefault();
        dragByElement.removeEventListener('click', onClickPreventDefault);
      }

      if (dragged) {
        dragByElement.addEventListener('click', onClickPreventDefault);
      }

    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // --------------- ПЕРЕМЕЩЕНИЕ ЗВЕЗДЫ ---------------


  function onArtifactsElementDragover(evt) { // кажд неск сот милсек, когд эл над зоной
    evt.preventDefault();
    return false;
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
    evt.preventDefault();
  }

  function onArtifactsElementDragleave(evt) { // уход эл с зоны
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  }

  function onDialogAvatarElementDrag(evt) {
    var dialogElement = document.querySelector('.setup');

    elementDrag(evt, dialogElement, dialogAvatarElement);
  }

  function onElementDragstart(evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }

    artifactsBagElement.addEventListener('dragover', onArtifactsElementDragover);
    artifactsBagElement.addEventListener('drop', onArtifactsElementDrop);
    artifactsBagElement.addEventListener('dragenter', onArtifactsElementDragenter);
    artifactsBagElement.addEventListener('dragleave', onArtifactsElementDragleave);
  }

  function resetPosition(element) {
    element.style.top = '';
    element.style.left = '';
  }

  function addPopupDrag() {
    dialogAvatarElement.addEventListener('mousedown', onDialogAvatarElementDrag);
  }

  function addStarDrag() {
    artifactsShopElement.addEventListener('dragstart', onElementDragstart);
  }

  function removePopupDrag() {
    dialogAvatarElement.removeEventListener('mousedown', onDialogAvatarElementDrag);
  }

  function removeStarDrag() {
    artifactsShopElement.removeEventListener('dragstart', onElementDragstart);
  }

  window.drag = {
    addPopupListeners: addPopupDrag,
    addShopListeners: addStarDrag,
    removePopupListeners: removePopupDrag,
    removeShopListeners: removeStarDrag,
    reset: resetPosition
  };
})();
