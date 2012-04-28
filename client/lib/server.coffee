# This is the class that talks to the server
class Server    
    constructor: () ->
        @socket = io.connect 'http://ec2-46-137-147-99.eu-west-1.compute.amazonaws.com:8081'
        @socket.on 'gametime', (data) =>
            if @callbackOnGametime 
                @callbackOnGametime data.gametime
            else
                console.log 'Y U NO USE Server.onGametime??'

        @socket.on 'mapSegment', (data) =>
            if @callbackOnMapSegment 
                @callbackOnMapSegment data
            else
                console.log 'Y U NO USE Server.onMapSegment??'

    onGametime: (callbackOnGametime) =>
        @callbackOnGametime = callbackOnGametime

    onMapSegment: (@callbackOnMapSegment) =>

    askForMapSegment: (num) =>
        @socket.emit('sendMapSegment', num)


class FakeServer    
    constructor: () ->
    
        ###
        @socket.on 'mapSegment', (data) =>
            if @callbackOnMapSegment 
                @callbackOnMapSegment data
            else
                console.log 'Y U NO USE Server.onMapSegment??'
                ###

    onGametime: (callbackOnGametime) =>
        callbackOnGametime 10

    onMapSegment: (@callbackOnMapSegment) =>

    askForMapSegment: (num) =>
        


