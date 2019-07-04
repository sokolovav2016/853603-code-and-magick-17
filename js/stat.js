'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 20;
  var DISTANCE_BETWEEN = 50;
  var COLUMN_WIDTH = 40;
  var MAX_HISTOGRAM_HEIGHT = 150;

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 210, y + 10);
    ctx.lineTo(x + CLOUD_WIDTH, y);
    ctx.lineTo(x + 410, y + 135);
    ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT);
    ctx.lineTo(x + 210, y + 280);
    ctx.lineTo(x, y + CLOUD_HEIGHT);
    ctx.lineTo(x + 10, y + 135);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
  }

  function renderText(ctx, x, y, text) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(text, x, y);
  }

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3, 'Ура вы победили!');
    renderText(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + FONT_GAP, 'Список результатов:');

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var coordinateX = CLOUD_X + DISTANCE_BETWEEN * i + COLUMN_WIDTH * (i + 1);
      var coordinateY = (CLOUD_HEIGHT - FONT_GAP) - MAX_HISTOGRAM_HEIGHT * (times[i] / maxTime);

      ctx.fillStyle = '#000';

      ctx.fillText(names[i], coordinateX, CLOUD_HEIGHT);
      ctx.fillText(Math.floor(times[i]), coordinateX, coordinateY - GAP);

      if (names[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        var saturation = Math.floor(Math.random() * 100);
        ctx.fillStyle = 'hsl(240, ' + saturation.toString() + '%' + ', 50%)';
      }

      ctx.fillRect(coordinateX, coordinateY, COLUMN_WIDTH, MAX_HISTOGRAM_HEIGHT * (times[i] / maxTime));
    }
  };
})();
