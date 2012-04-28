var GameTimer = function(fps) {
    var gameTimer = {}

    var timer;
    var subscribers = [];
    gameTimer.fps = fps;
    gameTimer.startTime = null;
    gameTimer.gameTime = null;

    var update = function() {
        var now = new Date();
        var currentTime = now.getTime();
        gameTimer.gameTime = currentTime - this.startTime
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

        var startDate = new Date()
        gameTimer.startTime = startDate.getTime();
        gameTimer.gameTime = gameTimer.startTime;
    }

    return gameTimer;
}