var BackgroundRenderer = function(gameTimer, camera, container) {
    var blockHeight = 100;
    var activeBlocks = [];

    var colours = [
        'ffffff',
        'bee7fc',
        '9c56d2'
    ]

    colourIndex = colours.length-1;

    $(container).css('height', camera.height * camera.pixelSize)
    $(container).css('width', camera.width * camera.pixelSize)

    var getColour = function() {
        var col = colours[colourIndex];

        colourIndex -= 1;
        if (colourIndex < 0) {
            colourIndex = colours.length-1;
        }

        return col;
    }

    var hexToRgb = function(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    var addBlocks = function(num) {
        for (var i = 0; i < num; i++) {
            var magic = new MagicTable(container, camera.width, blockHeight, camera.pixelSize);
            Gradient.renderMagicTable(hexToRgb(getColour()), hexToRgb(getColour()), 3, magic)
            activeBlocks.push({
                elem: magic.getElem(),
                magic: magic,
                index: i,
                y0: 0, 
                y1: 0
            });
        }
    }


    var addLastToFirst = function(y0, y1) {
        var firstBlock = activeBlocks[0];
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (firstBlock && firstBlock.y1 < y0) {
            firstBlock.index = lastBlock.index + 1;
            Gradient.renderMagicTable(hexToRgb(getColour()), hexToRgb(getColour()), 3, firstBlock.magic)
            activeBlocks.push(activeBlocks.shift());
        }        
    }


    var positionBlocks = function(yOffset) {
        activeBlocks.forEach(function(block) {
            var y0 = block.index * blockHeight;
            // This is totally backwards, but hey, it works
            var yPos = ((-block.index * blockHeight) + yOffset) * camera.pixelSize;

            block.elem.css('top', yPos);
            block.y0 = y0;
            block.y1 = y0 + blockHeight;
        });
    }

    addBlocks(2);

    var update = function() {
        var ys = camera.getYs();
        y0 = ys.y0 + blockHeight/2;
        y1 = ys.y1 - blockHeight/2;
        addLastToFirst(y0, y1);
        positionBlocks(camera.getCenter());
    }


    gameTimer.subscribe(update);
};
