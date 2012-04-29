// Generated by CoffeeScript 1.3.1
var Server,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Server = (function() {

  Server.name = 'Server';

  function Server() {
    this.playerEventCallback = __bind(this.playerEventCallback, this);

    this.askForMapSegment = __bind(this.askForMapSegment, this);

    this.onPlayerEventBroadcastCallback = __bind(this.onPlayerEventBroadcastCallback, this);

    this.onStartCallback = __bind(this.onStartCallback, this);

    this.onMapSegment = __bind(this.onMapSegment, this);

    this.onGametime = __bind(this.onGametime, this);

    var _this = this;
    this.socket = io.connect('http://ec2-46-137-147-99.eu-west-1.compute.amazonaws.com:8081');
    this.socket.on('gametime', function(data) {
      if (_this.callbackOnGametime) {
        return _this.callbackOnGametime(data.gametime);
      } else {
        return console.log('Y U NO USE Server.onGametime??');
      }
    });
    this.socket.on('startGame', function(data) {
      if (_this.startCallback) {
        return _this.startCallback(data.y);
      } else {
        return console.log('Y U NO USE Server.onStartCallback??');
      }
    });
    this.socket.on('mapSegment', function(data) {
      if (_this.callbackOnMapSegment) {
        return _this.callbackOnMapSegment(data);
      } else {
        return console.log('Y U NO USE Server.onMapSegment??');
      }
    });
    this.socket.on('playerEventBroadcast', function(data) {
      if (_this.playerEventBroadcastCallback) {
        return _this.playerEventBroadcastCallback(data.id, data.event);
      } else {
        return console.log('Y U NO USE Server.onPlayerEventBroadcastCallback??');
      }
    });
  }

  Server.prototype.onGametime = function(callbackOnGametime) {
    this.callbackOnGametime = callbackOnGametime;
  };

  Server.prototype.onMapSegment = function(callbackOnMapSegment) {
    this.callbackOnMapSegment = callbackOnMapSegment;
  };

  Server.prototype.onStartCallback = function(startCallback) {
    this.startCallback = startCallback;
  };

  Server.prototype.onPlayerEventBroadcastCallback = function(playerEventBroadcastCallback) {
    this.playerEventBroadcastCallback = playerEventBroadcastCallback;
    return console.log('adding a  callback', this.playerEventBroadcastCallback);
  };

  Server.prototype.askForMapSegment = function(num) {
    return this.socket.emit('sendMapSegment', num);
  };

  Server.prototype.playerEventCallback = function(id, event) {
    return this.socket.emit('playerEvent', {
      id: id,
      event: event
    });
  };

  return Server;

})();
