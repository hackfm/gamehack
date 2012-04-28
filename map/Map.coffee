mapHelper = require './mapHelper.functions'

class Map 
    
    constructor: (@seed = 1) ->
        @lastPartLoaded = -1;
        @objects = 
            obstacles: [],
            speedup: [],
            slowdown: []
        @loadPart 3

    loadPart: (part) =>
        # make sure it's not already loaded
        start = @lastPartLoaded+1
        for i in [start...part]         
            newObjects = mapHelper.getMapTile @seed, i

            # add it to the array
            for e in newObjects.obstacles
                do (e) =>
                    @objects.obstacles.push e
            #@objects.speedup.concat   newObjects.speedup
            #@objects.slowdown.concat  newObjects.slowdown

        @lastPartLoaded = part



module.exports = Map