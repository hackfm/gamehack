var Camera = function(width, height, gameTimer, subjectPlayer) {
    var camera = {}
    camera.y0 = 0;
    camera.y1 = height;
    camera.width = width;
    camera.height = height;

    var top = Math.round(height / 3) * 2;
    var bottom = height - top;

    camera.update = function(gameTime) {
        var position = subjectPlayer.getPosition(gameTime);
        // THIS IS BACKWARDS? I think we have some crossed wires with player.js
        camera.y0 = position.y - top; // start (bottom of screen)
        camera.y1 = position.y + bottom; // end (top of screen)
    }

    camera.getYs = function() {
        return {
            y0: camera.y0,
            y1: camera.y1
        }
    }

    camera.getCenter = function() {
        return camera.y1 - bottom;
    }



    gameTimer.subscribe(camera.update);    

    return camera;
}