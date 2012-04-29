var BackgroundRenderer = function(gameTimer, camera, container, MagicRenderer) {
    var pub = {};

    var blockHeight = 60;
    var activeBlocks = [];

    var colours = [
        '7a8aff',
        '7ae0ff',
        '7affcf',
        '7aff8f',
        'd1ff7a',
        'fff67a',
        'ffd47a',
        'ff987a',
        'ff7d7a',
        'ff7aa5',
        'ff7af3',
        'c67aff',
        '947aff',
        '7a83ff'
    ]

    var colourCount = 1;
    var colourIndex = 0;
    var currentColour;

            var parallax = 3;

    var cameraStart = camera.getCenter()*parallax;

    $(container).css('height', camera.height * camera.pixelSize)
    $(container).css('width', camera.width * camera.pixelSize)

    var getColour = function() {
        var col = colours[colourIndex];

        colourCount += 1;

        if (colourCount/2 == Math.round(colourCount/2)) {
            colourIndex += 1;
        }

        if (colourIndex > colours.length - 1) {
            colourIndex = 0;
        }

        currentColour = col;
        return col;
    }

    pub.getCurrentColour = function() {
        return currentColour;
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
        var startOffset = Math.round(cameraStart / blockHeight)
        for (var i = 0; i < num; i++) {
            var magic = new MagicRenderer(container, camera.width, blockHeight, camera.pixelSize);
            //Gradient.renderMagicTable(hexToRgb(getColour()), hexToRgb(getColour()), 2, magic)
            Gradient.render(hexToRgb(getColour()), hexToRgb(getColour()), 2, magic)
            
            activeBlocks.push({
                elem: magic.getElem(),
                magic: magic,
                index: i + startOffset,
                y0: 0, 
                y1: 0
            });
        }
    }


    var addLastToFirst = function(y0) {
        var firstBlock = activeBlocks[0];
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (firstBlock && firstBlock.y1 < y0) {
            firstBlock.index = lastBlock.index + 1;
            //Gradient.renderMagicTable(hexToRgb(getColour()), hexToRgb(getColour()), 2, firstBlock.magic)
            Gradient.render(hexToRgb(getColour()), hexToRgb(getColour()), 2, firstBlock.magic)
            activeBlocks.push(activeBlocks.shift());

            return true
        }   

        return false;     
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

    addBlocks(3);

    var update = function() {
        var ys = camera.getYs();
        y0 = ys.y0*parallax - 0;
        addLastToFirst(y0);
        positionBlocks(camera.getCenter()*parallax);
    }

    gameTimer.subscribe(update);

    return pub;
};
