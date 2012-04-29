var PlayerRenderer = function(players, gameTimer, camera, magic) {
    var playerRenderer = {}

    var colors = [
        {player: [0, 255, 0, 1], tail: [255, 0, 255, 1], radar: [0, 255, 0, 1]},
        {player: [255, 255, 0, 1], tail: [0, 0, 255, 1], radar: [255, 255, 0, 1]},
        {player: [255, 0, 255, 1], tail: [0, 255, 0, 1], radar: [255, 0, 255, 1]},
    ];

    var drawPoints = function(player, gameTime) {
        var ys = camera.getYs();
        var lineSegments = player.getLineSegments(ys.y0, ys.y1, gameTime);
        var segments = lineSegments.length;
        for (var i = 0; i < segments; i++) {
            var ps = player.getPosition(gameTime);
            magic.setPixel(lineSegments[i].x1, camera.getCenter() - lineSegments[i].y1, [0, 0, 0, 1])
        }
    }

    var drawXValues = function(player, gameTime, color) {
        var ys = camera.getYs();
        var xValues = player.getXValues(ys.y0, ys.y1, gameTime);
        var len = xValues.length;
        for (var i = 0; i < len; i++) {
            if ((typeof(xValues[i]) != "undefined")) {              
                magic.setPixel(xValues[i], camera.height - i, color)
            }
        }
    }

    var drawDot = function(player, gameTime, color) {
        var position = player.getPosition(gameTime);
        var ys = camera.getYs();
        var y = camera.height - (position.y - ys.y0);
        magic.setPixel(position.x, y, color)
    }

    playerRenderer.update = function(gameTime) {
        magic.clear();

        // Draw other players first
        playersSorted = players.otherPlayers();
        var i = 0;
        playersSorted.forEach(function(player) { 
            //drawPoints(player, gameTime);
            var colorCodes = colors[i];

            drawXValues(player, gameTime, colorCodes.tail);
            drawDot(player, gameTime, colorCodes.player);

            ++i;
        });

        // Now play "you"
        drawXValues(players.you(), gameTime, [255, 255, 255, 1]);
        drawDot(players.you(), gameTime, [0, 0, 0, 1]);


        if (magic.draw) {
            magic.draw();    
        }
    }    

    gameTimer.subscribe(playerRenderer.update);

    return playerRenderer;
}