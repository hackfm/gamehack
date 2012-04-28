class Map 
    
    constructor: (@server, @sceneryTable) ->
        @lastPartLoaded = -1;
        @objects = 
            obstacles: [],
            speedup: [],
            slowdown: []
        @loadPart 3

        @server.onMapSegment (data) =>
            console.log 'map data', data
            
            # add it to the array
            for e in data.obstacles
                do (e) =>
                    @objects.obstacles.push e
            #@objects.speedup.concat   newObjects.speedup
            #@objects.slowdown.concat  newObjects.slowdown

    drawArea: (lowerY) =>
        width = 48
        height = 57

        for y in [0..height]
            for x in [0..width]
                color = [x*5, y*3, x, 1]
                @sceneryTable.setPixel x, y, color
    


    loadPart: (part) =>
        # make sure it's not already loaded
        start = @lastPartLoaded+1
        for i in [start...part]   
            @server.askForMapSegment i

        @lastPartLoaded = part
