class PlayerList 
    constructor: (@thisPlayer, @server, @map, @globalSpeed) ->
        # Make it pseudo unique
        @id = Math.floor Math.random() * 10000000

        @players = {}
        @players[@id] = @thisPlayer

        # todo: add callback to server

    updatePlayer: (id, event) =>
        if @players[id]? 
            # player exists already
            @players[id].addEvent event
        else
            # let's create a new player
            player = new Player @map, 48, @globalSpeed
            player.addEvent event
            @players[id] = player


        #add to @players or call add on this player

    removePlayer: (id) =>
        delete @players[id]

    you: () =>
        return @thisPlayer

    otherPlayers: () =>
        list = []
        for id, player of @players
            list.push player unless @thisPlayer is player
        return list

