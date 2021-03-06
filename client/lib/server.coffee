# This is the class that talks to the server
class Server    
    constructor: () ->
        @socket = io.connect 'http://urmash.com:18081'

        @socket.on 'startGame', (data) =>
            if @startCallback 
                @startCallback data.gametime, data.y
            else
                console.log 'Y U NO USE Server.onStartCallback??'

        @socket.on 'mapSegment', (data) =>
            if @callbackOnMapSegment 
                @callbackOnMapSegment data
            else
                console.log 'Y U NO USE Server.onMapSegment??'

        @socket.on 'playerEventBroadcast', (data) =>
            if @playerEventBroadcastCallback 
                @playerEventBroadcastCallback data.id, data.event
            else
                console.log 'Y U NO USE Server.onPlayerEventBroadcastCallback??'

        @socket.on 'removePlayerBroadcast', (id) =>
            console.log('mashmashmahs');
            if @removePlayerBroadcastCallback 
                @removePlayerBroadcastCallback id
            else
                console.log 'Y U NO USE Server.onRemovePlayerBroadcastCallback??'

    onMapSegment: (@callbackOnMapSegment) =>

    onStartCallback: (@startCallback) =>

    onPlayerEventBroadcastCallback: (@playerEventBroadcastCallback) =>

    onRemovePlayerBroadcastCallback: (@removePlayerBroadcastCallback) =>

    sendPlayerDead: (id) =>
        @socket.emit 'playerDead', {id: id}

    playerEventCallback: (id, event) =>
        @socket.emit 'playerEvent', {id: id, event: event}

    playerEventCallback: (id, event) =>
        @socket.emit 'playerEvent', {id: id, event: event}
        
    sendY: (y) =>
        @socket.emit 'sendY', y

