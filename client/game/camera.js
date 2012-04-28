var Camera = function(height, gameTimer, subjectPlayer) {
    var camera = {}
    camera.y0 = 0;
    camera.y1 = height;

    var top = Math.round(height / 2);
    var bottom = height - top;

    camera.update = function(gameTime) {
        var position = subjectPlayer.getPosition(gameTime);
        camera.y0 = position.y - bottom;
        camera.y1 = position.y + top;
    }

    camera.getYs = function() {
        return {
            y0: camera.y0,
            y1: camera.y1
        }
    }

    gameTimer.subscribe(camera.update);    

    return camera;
}