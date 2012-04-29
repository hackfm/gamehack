class PlayerList
    constructor: () ->
        @players = {}

    getStartY: () =>
        startY = 200 
        for player, playerId in @players
            if player[0].y > startY
                startY = player[0].y
        return startY

    getDeathline: () =>
        return getStartY() - 200;

    getAddEventForPlayer: (id, event) =>
        if @players[id]?
            @players[id].unshift event
        else
            @players[id] = [event]

    deletePlayer: (id) =>
        delete @players[id]


module.export = PlayerList