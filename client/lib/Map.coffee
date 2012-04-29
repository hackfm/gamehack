class Map 
    
    constructor: (@server, @sceneryTable) ->
        @map = {}

        @level = new Level('Witchin!');

    getMapSegment: (page) =>
        unless @map[page]?
            @map[page] = @level.getMap page, 500

        return @map[page]

    getY: (y) =>
        page = Math.floor(y / 500)
        segment = @getMapSegment page
        return segment[y % 500]

    drawArea: (offset) =>
        width = 48
        height = 57

        for y in [0..height]
            for x in [0..width]
                pixel = @getPixel(x, y + offset);
                switch pixel
                    when " " then color = [0, 0, 0, 0]
                    when "X" then color = [0, 0, 0, 1]
                    when "O" then color = [49, 79, 79, 1]
                    when "+" then color = [50, 205, 50, 1]
                    when "-" then color = [255, 0, 0, 1]
                
                @sceneryTable.setPixel x, height-y-1, color
    
    getPixel: (x,y) =>  
        return ' ' if y < 0
        return @getY(y).charAt(x);


    loadPart: (part) =>
        # make sure it's not already loaded
        start = @lastPartLoaded+1
        for i in [start...part]   
            @server.askForMapSegment i

        @lastPartLoaded = part
