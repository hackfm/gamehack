var yourPlayer = {

    segments: [
        {x: 0, y: 0},
        {x: 5, y: 5},
        {x: 5, y: 15},
        {x: 20, y: 30},
        {x: 20, y: 40}
    ],

    getLineSegments: function(y1, y2, gameTime) {
        return this.segments;
    },

    getPosition: function(gameTime) {
        return this.segments[this.segments.length - 1].y
    }

};

(function($) {
    $(document).ready(function() {

        var width = 48;
        var height = 57;

        var gameTimer = new GameTimer(3);

        // This objects connects to the server. That's pretty important, huh?!
        var server = new FakeServer();
        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log("Gametime:",gameTimer.getGameTime());
        });


        // Scenery is awesome! Let's draw it
        var sceneryMagicTable = new MagicTable($("#scenery")[0], width, height, 4);

        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);

        var yourPlayer = new Player(function(){return ""}, width);

        var camera = new Camera(57, gameTimer, yourPlayer);

        var playersElem = $("#players")[0];
        //var playerMagicCanvas = new MagicCanvas(playersElem, width, height);
        var playerMagicTable = new MagicTable(playersElem, width, height, 4);
        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, playerMagicTable);

        

        
//        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
        
        gameTimer.start();
        yourPlayer.addEvent({t: gameTimer.gameTime, x: 0, y: 0, v: 5, dx: 0});
        
    })
})(jQuery);