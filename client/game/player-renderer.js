var PlayerRenderer = function(players, gameTimer, camera, magic) {
    var playerRenderer = {}

    var drawPoints = function(player, gameTime) {
        var ys = camera.getYs();
        var lineSegments = player.getLineSegments(ys.y0, ys.y1, gameTime);
        var segments = lineSegments.length;
        for (var i = 0; i < segments; i++) {
            magic.setPixel(lineSegments[i].x1, lineSegments[i].y1, [0, 0, 0, 1])
        }
    }

    var drawXValues = function(player, gameTime) {
        var ys = camera.getYs();
        var xValues = player.getXValues(ys.y0, ys.y1, gameTime);
        
        var len = xValues.length;
        for (var i = 0; i < len; i++) {
            if ((typeof(xValues[i]) != "undefined")) {
                magic.setPixel(xValues[i], i, [0, 0, 0, 1])
            }
        }        
    }

    playerRenderer.update = function(gameTime) {
        magic.clear();

        players.forEach(function(player) {
            //drawPoints(player, gameTime);
            drawXValues(player, gameTime);
        });

        if (magic.draw) {
            magic.draw();    
        }
    }    

    gameTimer.subscribe(playerRenderer.update);

    return playerRenderer;
}