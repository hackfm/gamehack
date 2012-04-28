srand = require "srand"  

###
    Returns a 48x200 px area
###

exports.getMapTile = (seed, pos) ->
    LENGTH = 200
    WIDTH = 48

    offsetY = pos * LENGTH

    objects = 
        obstacles: [],
        speedup: [],
        slowdown: []

    srand.seed seed*1000 + pos;
    randMax = (max) ->
        return Math.floor(srand.random() * max)

    randMinMax = (min,max) ->
        return Math.floor(srand.random() * (max - min)) + min

    yStart = 5 + offsetY
    lengthNextBlock = randMinMax(10,20)

    while (yStart + lengthNextBlock) < ((pos + 1) * LENGTH)

        typeRand = randMax 100
        if typeRand in [0..35]
            # block on the left side
            objects.obstacles.push {
                x1: 0,
                y1: yStart,
                x2: randMinMax(10,20), 
                y2: yStart + lengthNextBlock
            }
        if typeRand in [36..70]
            # block on the right side
            objects.obstacles.push {
                x1: WIDTH - randMinMax(10,20),  
                y1: yStart,
                x2: WIDTH, 
                y2: yStart + lengthNextBlock
            }

        if typeRand in [71..85]
            lengthNextBlock = 5

            # block in the left side
            objects.obstacles.push {
                x1: 0, 
                y1: yStart,
                x2: randMinMax(5,20), 
                y2: yStart + lengthNextBlock
            }
       
            # block on the right side
            objects.obstacles.push {
                x1: WIDTH - randMinMax(5,20), 
                y1: yStart,
                x2: WIDTH, 
                y2: yStart + lengthNextBlock
            }

        if typeRand in [86..100]
            # block in the left side
            objects.obstacles.push {
                x1: randMinMax(10,20), 
                y1: yStart,
                x2: randMinMax(WIDTH - 20,WIDTH - 10), 
                y2: yStart + lengthNextBlock
            }
            

        yStart = yStart + 20 + randMax 25
        lengthNextBlock = randMinMax(10, 20)

    return objects
