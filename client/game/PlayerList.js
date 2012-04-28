// Generated by CoffeeScript 1.3.1
var PlayerList,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PlayerList = (function() {

  PlayerList.name = 'PlayerList';

  function PlayerList(thisPlayer, server, map) {
    this.thisPlayer = thisPlayer;
    this.server = server;
    this.map = map;
    this.you = __bind(this.you, this);

    this.removePlayer = __bind(this.removePlayer, this);

    this.updatePlayer = __bind(this.updatePlayer, this);

    this.id = Math.floor(Math.rand() * 10000000);
    this.players = {};
    this.players[this.id] = this.thisPlayer;
  }

  PlayerList.prototype.updatePlayer = function(data) {
    var player;
    console.log(data);
    if (this.players[data.id] != null) {
      return this.players[data.id].add(data);
    } else {
      player = new Player(this.map, 48);
      player.add(data);
      return this.players[data.id] = player;
    }
  };

  PlayerList.prototype.removePlayer = function(data) {};

  PlayerList.prototype.you = function() {
    return this.thisPlayer;
  };

  return PlayerList;

})();
