var Camera = function(width, height, pixelSize, gameTimer, startY) {
    var camera = {}
    camera.y0 = 0;
    camera.y1 = height;
    camera.width = width;
    camera.height = height;
    camera.pixelSize = pixelSize;
    var subjectPlayer = null;
    var callbackMap = null;

    var top = Math.floor(height / 3);
    var bottom = height - top;

    camera.update = function(gameTime) {
        if (subjectPlayer) {
            var position = subjectPlayer.getPosition(gameTime);
            // THIS IS BACKWARDS? I think we have some crossed wires with player.js
            camera.y0 = position.y - top; // start (bottom of screen)
            camera.y1 = position.y + bottom; // end (top of screen)
            camera.score = position.score;
        }

        if (callbackMap) {
            callbackMap(position.y - top, position.score);
        }
    }

    camera.onUpdateMap = function (callback) {
        callbackMap = callback;
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

    camera.setFocusPlayer = function(player) {
        subjectPlayer = player;
    }

    camera.y0 = startY - top; // start (bottom of screen)
    camera.y1 = startY + bottom; // end (top of screen)


    gameTimer.subscribe(camera.update);    

    return camera;
}
