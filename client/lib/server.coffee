# This is the class that talks to the server
class Server    
    constructor: () ->
        @socket = io.connect 'http://ec2-46-137-147-99.eu-west-1.compute.amazonaws.com:8081'
        @socket.on 'gametime', (data) =>
            if @onGametime 
                @onGametime data.gametime
            else
                console.log 'Y U NO USE Server.onGametime??'

    onGametime: (onGametime) =>
        @onGametime = onGametime
