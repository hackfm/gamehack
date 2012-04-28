var PlayerRenderer = function(players, gameTimer, camera, canvas) {
    var playerRenderer = {}
    var context = canvas.getContext("2d");

    var draw = function(lineSegments) {
        context.beginPath();
        context.moveTo(lineSegments[0].x, lineSegments[0].y);

        var segments = lineSegments.length;
        for (var i = 1; i < segments; i++) {
            context.lineTo(lineSegments[i].x, lineSegments[i].y);
        }

        context.stroke();
    }

    playerRenderer.update = function(gameTime) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        players.forEach(function(player) {
            var lineSegments = player.getLineSegments(camera.y1, camera.y2, gameTime);
            draw(lineSegments);
        });
    }    

    gameTimer.subscribe(playerRenderer.update);

    return playerRenderer;
}