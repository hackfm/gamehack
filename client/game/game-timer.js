var GameTimer = function(fps) {
    var gameTimer = {}

    var timer;
    var subscribers = [];
    gameTimer.fps = fps;
    gameTimer.zeroGameTime = null;

    var update = function() {

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

    gameTimer.getGameTime = function() {
        return (new Date().getTime()/1000) - gameTimer.zeroGameTime;
    }

    return gameTimer;
}