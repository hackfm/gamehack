var yourPlayer;

(function($) {
    $(document).ready(function() {

        var width = 48;
        var height = 57;

        var gameTimer = new GameTimer(3);

        var server = new FakeServer();
        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log(gameTimer.getGameTime());
        });

        yourPlayer = new Player(function(){return ""}, width);

        var camera = new Camera(57, gameTimer, yourPlayer);

        var playersElem = $("#players")[0];
        //var magic = new MagicCanvas(playersElem, width, height);
        var magic = new MagicTable(playersElem, width, height, 4);

        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, magic);
        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, magic);
        
        gameTimer.start();
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(width/2), y: 0, v: 20, dx: 0});
        
        var fakeControls = setInterval(function() {
            var action;
            var ran = Math.random();
            if (ran > 0.6) {
                action = 'right'
            } else if (ran > 0.3) {
                action = 'left';
            }
            yourPlayer.createEvent(gameTimer.getGameTime(), action);        
        }, 500)

    })
})(jQuery);