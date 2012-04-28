var GameTimer = function(fps) {
    var gameTimer = {}

    var timer;
    var subscribers = [];
    gameTimer.fps = fps;
    gameTimer.zeroGameTime = null;

    var update = function() {
<<<<<<< HEAD
=======
        var now = new Date();
        var currentTime = now.getTime();

        gameTimer.gameTime = (currentTime - gameTimer.startTime) / 1000;
>>>>>>> ad3d39db75640cee57eb4b234047bac3c2f75f90
        subscribers.forEach(function(subscriber) {
            subscriber(gameTimer.gameTime);
        });
    }

    gameTimer.subscribe = function(callback) {
        subscribers.push(callback);
    }

    gameTimer.start = function() {
        timer = setInterval(function() {
            update();
        }, 1000/this.fps);
    }

    gameTimer.setGameTime = function(offset) {
        gameTimer.zeroGameTime = new Date().getTime()/1000 - offset;
    }

<<<<<<< HEAD
    gameTimer.getGameTime = function() {
        return (new Date().getTime()/1000) - gameTimer.zeroGameTime;
=======
        var startDate = new Date()
        gameTimer.startTime = startDate.getTime();
        gameTimer.gameTime = 0;
>>>>>>> ad3d39db75640cee57eb4b234047bac3c2f75f90
    }

    return gameTimer;
}