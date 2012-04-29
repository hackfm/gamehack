var PlayerRenderer = function(players, gameTimer, camera, magic) {
    var playerRenderer = {}

    var drawPoints = function(player, gameTime) {
        var ys = camera.getYs();
        var lineSegments = player.getLineSegments(ys.y0, ys.y1, gameTime);
        var segments = lineSegments.length;
        for (var i = 0; i < segments; i++) {
            var ps = player.getPosition(gameTime);
            magic.setPixel(lineSegments[i].x1, camera.getCenter() - lineSegments[i].y1, [0, 0, 0, 1])
        }
    }

    var drawXValues = function(player, gameTime) {
        var ys = camera.getYs();
        var xValues = player.getXValues(ys.y0, ys.y1, gameTime);
        
        var len = xValues.length;
        for (var i = 0; i < len; i++) {
            if ((typeof(xValues[i]) != "undefined")) {              
                magic.setPixel(xValues[i], camera.height - i, [255, 255, 255, 1])
            }
        }
    }

    var drawDot = function(player, gameTime) {
        var position = player.getPosition(gameTime);
        var ys = camera.getYs();
        var y = camera.height - (position.y - ys.y0);
        magic.setPixel(position.x, y, [0, 0, 0, 1])
    }

    playerRenderer.update = function(gameTime) {
        magic.clear();

        playersSorted = players.otherPlayers();
        playersSorted.push(players.you());

        playersSorted.forEach(function(player) {
            //drawPoints(player, gameTime);
            drawXValues(player, gameTime);
            drawDot(player, gameTime);
        });

        if (magic.draw) {
            magic.draw();    
        }
    }    

    gameTimer.subscribe(playerRenderer.update);

    return playerRenderer;
}