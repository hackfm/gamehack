events = require 'events'

class PlayerList extends events.EventEmitter
    constructor: () ->
        @players = {}
        @setMaxListeners 0
        @maxY = 200;

    getStartY: () =>
        
        startY = 200 
        for playerId, player of @players
            if player[0].y > startY
                startY = player[0].y
        return startY
        
        #return @maxY

    setY: (y) =>
        if @maxY < y
            @maxY = y

    getDeathline: () =>
        return getStartY() - 200;

    getAddEventForPlayer: (id, event) =>
        if @players[id]?
            @players[id].unshift event
        else
            @players[id] = [event]

        @emit 'playerEventBroadcast', id, event

    deletePlayer: (id) =>
        delete @players[id]
        @emit 'removePlayerBroadcast', id


module.exports = PlayerList