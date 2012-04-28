var BackgroundRenderer = function(gameTimer, camera, magic, container) {

    var activeBlocks = [];

    var update = function() {
        var ys = camera.getYs();
        removeOldBlocks(ys.y0, ys.y1);
        addNewBlocks(ys.y0, ys.y1);
        positionBlocks(camera.getCenter());
    }

    var removeOldBlocks = function(y0, y1) {
        if (activeBlocks[0].y1 < y0) {
            activeBlocks.shift()
        }
        if (activeBlocks[activeBlocks.length-1].y0 > y1) {
            activeBlocks.pop()
        }
    }

    var addNewBlocks = function(y0, y1) {
        var firstBlock = activeBlocks[0];
        if (firstBlock.y0 > y0) {
            var elem = $("<table />");
            $(container).append(elem);            
            activeBlocks.unshift({
                elem: elem,
                index: firstBlock.index - 1, 
                y0: 0, 
                y1: 0
            });
        }
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (lastBlock.y1 < y1) {
            var elem = $("<table />");
            $(container).append(elem);
            activeBlocks.shift({
                elem: elem,
                index: lastBlock.index + 1, 
                y0: 0, 
                y1: 0
            });
        }
    }

    var positionBlocks = function(yOffset) {
        activeBlocks.forEach(function(block) {
            var y0 = (block.index * blockHeight) + yOffset;
            block.elem.css('y', y0);
            block.y0 = y0;
            block.y1 = y0 + blockHeight;
        });
    }

    gameTimer.subscribe(update);
};
