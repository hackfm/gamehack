var BackgroundRenderer = function(gameTimer, camera, magic, container) {
    var blockHeight = 20;
    var activeBlocks = [];
var i = 0;
    var update = function() {
        if (i > 0) {
            return;
        }
        var ys = camera.getYs();
        removeOldBlocks(ys.y0, ys.y1);
        addNewBlocks(ys.y0, ys.y1);
        positionBlocks(camera.getCenter());
        i++
    }

    var removeOldBlocks = function(y0, y1) {
        var firstBlock = activeBlocks[0];
        // if (firstBlock) {
        //     console.log(firstBlock.y1 +", "+ y0)
        // }
        if (firstBlock && firstBlock.y1 < y0) {
            firstBlock.elem.remove()
            console.log('removefirst')
            activeBlocks.shift()
        }
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (lastBlock && lastBlock.y0 > y1) {
            lastBlock.elem.remove()
            console.log('removelast')
            activeBlocks.pop()
        }
    }

    var addNewBlocks = function(y0, y1) {
        var firstBlock = activeBlocks[0];
        if (!firstBlock || firstBlock.y0 > y0) {
            console.log('addfirst')
            var magic = new MagicTable(container, camera.width, blockHeight, 4);
            activeBlocks.unshift({
                elem: magic.getElem(),
                index: firstBlock ? firstBlock.index - 1 : 0,
                y0: 0, 
                y1: 0
            });
        }
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (!lastBlock || lastBlock.y1 < y1) {
            console.log('addlast')
            var magic = new MagicTable(container, camera.width, blockHeight, 4);
            activeBlocks.push({
                elem: magic.getElem(),
                index: lastBlock ? lastBlock.index + 1 : 0, 
                y0: 0, 
                y1: 0
            });
        }
    }

    var positionBlocks = function(yOffset) {
        activeBlocks.forEach(function(block) {
            var y0 = (block.index * blockHeight) - yOffset;
            block.elem.css('y', y0);
            block.y0 = y0;
            block.y1 = y0 + blockHeight;
            //console.log(activeBlocks)
            //console.log(block.y0)
        });
    }

    gameTimer.subscribe(update);
};
