'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOUR = '#fff';
var GAP = 10;
var GAP_COLUMN = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var colorColumn = '';
var COLUMN_Y = BAR_HEIGHT - GAP_COLUMN - GAP;
var TEXT_X = 130;
var TEXT_Y = 30;
var TEXT_HEIGHT = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderColumn = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};


window.renderStatistics = function (ctx, players, times) {
   renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOUR);
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', TEXT_X, TEXT_Y);
  ctx.fillText('Список результатов:', TEXT_X, TEXT_Y + TEXT_HEIGHT);
  var maxTime = Math.floor(getMaxElement(times));
  for (var i = 0; i < players.length; i++) {
    var COLUMN_X = CLOUD_X + GAP + GAP_COLUMN + (GAP_COLUMN + BAR_WIDTH) * i;
    var floorTimes = Math.floor(times[i]);
    if (players[i] === 'Вы') {
      colorColumn = 'rgba(255, 0, 0, 1)';
    } else {
      colorColumn = 'hsl(240,' + window.util.getRandomInt(0, 101) + '%, 50%)';
    }
    renderColumn(ctx, COLUMN_X, COLUMN_Y, BAR_WIDTH, BAR_HEIGHT, colorColumn);
    renderColumn(ctx, COLUMN_X, COLUMN_Y, BAR_WIDTH, BAR_HEIGHT - ((BAR_HEIGHT * floorTimes) / maxTime), CLOUD_COLOUR);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], COLUMN_X, CLOUD_HEIGHT - GAP);
  }
};
