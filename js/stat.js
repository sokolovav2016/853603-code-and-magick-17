'use strict';

(function () {
  var DISTANCE_BETWEEN = 50;
  var COLUMN_WIDTH = 40;
  var MAX_HISTOGRAM_HEIGHT = 150;
  var Cloud = {
    WIDTH: 420,
    HEIGHT: 270,
    X: 100,
    Y: 10
  };
  var Gap = {
    JUST: 10,
    FONT: 20
  };

  function renderCloud(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 210, y + 10);
    ctx.lineTo(x + Cloud.WIDTH, y);
    ctx.lineTo(x + 410, y + 135);
    ctx.lineTo(x + Cloud.WIDTH, y + Cloud.HEIGHT);
    ctx.lineTo(x + 210, y + 280);
    ctx.lineTo(x, y + Cloud.HEIGHT);
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
    renderCloud(ctx, Cloud.X + Gap.JUST, Cloud.Y + Gap.JUST, 'rgba(0, 0, 0, 0.7)');
    renderCloud(ctx, Cloud.X, Cloud.Y, '#fff');

    renderText(ctx, Cloud.X + Gap.JUST * 2, Cloud.Y + Gap.JUST * 3, 'Ура вы победили!');
    renderText(ctx, Cloud.X + Gap.JUST * 2, Cloud.Y + Gap.JUST * 3 + Gap.FONT, 'Список результатов:');

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var coordinateX = Cloud.X + DISTANCE_BETWEEN * i + COLUMN_WIDTH * (i + 1);
      var coordinateY = (Cloud.HEIGHT - Gap.FONT) - MAX_HISTOGRAM_HEIGHT * (times[i] / maxTime);

      ctx.fillStyle = '#000';

      ctx.fillText(names[i], coordinateX, Cloud.HEIGHT);
      ctx.fillText(Math.floor(times[i]), coordinateX, coordinateY - Gap.JUST);

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
