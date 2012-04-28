class PlayerList 
    constructor: (@thisPlayer, @server, @map) ->
        # Make it pseudo unique
        @id = Math.floor Math.rand() * 10000000

        @players = {}
        @players[@id] = @thisPlayer

        # todo: add callback to server

    updatePlayer: (data) =>
        console.log data
        if @players[data.id]? 
            # player exists already
            @players[data.id].add data
        else
            # let's create a new player
            player = new Player @map, 48
            player.add data
            @players[data.id] = player


        #add to @players or call add on this player

    removePlayer: (data) =>
        #delete @players[data.id]

    you: () =>
        return @thisPlayer


