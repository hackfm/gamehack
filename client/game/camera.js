var Camera = function(height, gameTimer, subjectPlayer) {
    var camera = {}
    camera.y1 = 0;
    camera.y2 = height;

    var top = Math.round(height / 2);
    var bottom = height - top;

    camera.update = function(gameTime) {
        var position = subjectPlayer.getPosition(gameTimer);
        camera.y1 = position - bottom;
        camera.y2 = position + top;
    }

    gameTimer.subscribe(camera.update);    

    return camera;
}