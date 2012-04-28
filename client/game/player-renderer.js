var PlayerRenderer = function(players, gameTimer, camera, magic) {
    var playerRenderer = {}

    var draw = function(lineSegments) {
        var segments = lineSegments.length;
        for (var i = 0; i < segments; i++) {
            magic.setPixel(lineSegments[i].x, lineSegments[i].y, [0, 0, 0, 1])
        }
    }

    playerRenderer.update = function(gameTime) {
        magic.clear();

        players.forEach(function(player) {
            var lineSegments = player.getLineSegments(camera.y1, camera.y2, gameTime);
            draw(lineSegments);
        });

        if (magic.draw) {
            magic.draw();    
        }
    }    

    gameTimer.subscribe(playerRenderer.update);

    return playerRenderer;
}