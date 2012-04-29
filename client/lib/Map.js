// Generated by CoffeeScript 1.3.1
var Map,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Map = (function() {

  Map.name = 'Map';

  function Map(server, sceneryTable) {
    this.server = server;
    this.sceneryTable = sceneryTable;
    this.loadPart = __bind(this.loadPart, this);

    this.getPixel = __bind(this.getPixel, this);

    this.drawArea = __bind(this.drawArea, this);

    this.getY = __bind(this.getY, this);

    this.getMapSegment = __bind(this.getMapSegment, this);

    this.map = {};
    this.level = new Level('Witchin!');
  }

  Map.prototype.getMapSegment = function(page) {
    if (this.map[page] == null) {
      this.map[page] = this.level.getMap(page, 500);
    }
    return this.map[page];
  };

  Map.prototype.getY = function(y) {
    var page, segment;
    page = Math.floor(y / 500);
    segment = this.getMapSegment(page);
    return segment[y % 500];
  };

  Map.prototype.drawArea = function(offset) {
    var color, height, pixel, width, x, y, _i, _results;
    width = 48;
    height = 57;
    this.sceneryTable.clear();
    _results = [];
    for (y = _i = 0; 0 <= height ? _i <= height : _i >= height; y = 0 <= height ? ++_i : --_i) {
      _results.push((function() {
        var _j, _results1;
        _results1 = [];
        for (x = _j = 0; 0 <= width ? _j <= width : _j >= width; x = 0 <= width ? ++_j : --_j) {
          pixel = this.getPixel(x, y + offset);
          switch (pixel) {
            case " ":
              color = [0, 0, 0, 0];
              break;
            case "X":
              color = [0, 0, 0, 1];
              break;
            case "O":
              color = [0, 0, 0, 1];
              break;
            case "+":
              color = [18, 252, 40, 0.6];
              break;
            case "-":
              color = [0, 0, 0, 0.3];
          }
          _results1.push(this.sceneryTable.setPixel(x, height - y - 1, color));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  };

  Map.prototype.getPixel = function(x, y) {
    if (y < 0) {
      return ' ';
    }
    return this.getY(y).charAt(x);
  };

  Map.prototype.loadPart = function(part) {
    var i, start, _i;
    start = this.lastPartLoaded + 1;
    for (i = _i = start; start <= part ? _i < part : _i > part; i = start <= part ? ++_i : --_i) {
      this.server.askForMapSegment(i);
    }
    return this.lastPartLoaded = part;
  };

  return Map;

})();
