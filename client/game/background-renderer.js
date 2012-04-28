var BackgroundRenderer = function(gameTimer, camera, container) {
    var blockHeight = 30;
    var activeBlocks = [];

    $(container).css('height', camera.height * camera.pixelSize)
    $(container).css('width', camera.width * camera.pixelSize)


    var update = function() {
        var ys = camera.getYs();
        y0 = ys.y0;
        y1 = ys.y1;
        //removeOldBlocks(y0, y1);
        //addNewBlocks(y0, y1);
        
        repositionBlocks(y0, y1);
        positionBlocks(camera.getCenter());
        // console.log(activeBlocks)
    }

    var removeOldBlocks = function(y0, y1) {

        var firstBlock = activeBlocks[0];
        if (firstBlock) {
            console.log(firstBlock.y1 +", "+ y0)
        }

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

    var addBlocks = function(num) {
        for (var i = 0; i < num; i++) {
            var magic = new MagicTable(container, camera.width, blockHeight, camera.pixelSize);
            Gradient.renderMagicTable({r:0, g:0, b:0}, {r:255, g:0, b:0}, 1, magic)
            activeBlocks.push({
                elem: magic.getElem(),
                index: i,
                y0: 0, 
                y1: 0
            });
        }
    }

    var addNewBlocks = function(y0, y1) {
        var firstBlock = activeBlocks[0];
        if (!firstBlock || firstBlock.y0 > y0) {
            console.log('addfirst')
            var magic = new MagicTable(container, camera.width, blockHeight, camera.pixelSize);
            var index = firstBlock ? firstBlock.index - 1 : 0;
            Gradient.renderMagicTable({r:0, g:0, b:0}, {r:255, g:0, b:0}, 1, magic)
            activeBlocks.unshift({
                elem: magic.getElem(),
                index: index,
                y0: 0, 
                y1: 0
            });
        }
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (!lastBlock || lastBlock.y1 < y1) {
            console.log('addlast')
            var magic = new MagicTable(container, camera.width, blockHeight, camera.pixelSize);
            Gradient.renderMagicTable({r:0, g:0, b:0}, {r:255, g:0, b:0}, 1, magic)
            var index = lastBlock ? lastBlock.index + 1 : 0;
            activeBlocks.push({
                elem: magic.getElem(),
                index: index, 
                y0: 0, 
                y1: 0
            });
        }
    }

    var repositionBlocks = function(y0, y1) {
        console.log('reposition')        
        var firstBlock = activeBlocks[0];
        var lastBlock = activeBlocks[activeBlocks.length-1];
        if (firstBlock && firstBlock.y1 < y0) {
            firstBlock.index = lastBlock.index + 1;

            activeBlocks.push(activeBlocks.pop())
        }        


        //console.log(activeBlocks)
    }


    var positionBlocks = function(yOffset) {
        //console.log(yOffset)
        activeBlocks.forEach(function(block) {
            var y0 = block.index * blockHeight;
            // This is totally backwards, but hey, it works
            var yPos = ((-block.index * blockHeight) + yOffset) * camera.pixelSize;

            block.elem.css('top', yPos);
            block.y0 = y0;
            block.y1 = y0 + blockHeight;
            //console.log(activeBlocks)
            //console.log(block.y0)
        });
    }

        addBlocks(3);

    gameTimer.subscribe(update);
};
