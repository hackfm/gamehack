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

        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(30);
        
        // This object communicates with the server
        var server = new Server();
        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log("Gametime:",gameTimer.getGameTime());
        });


        // Scenery is awesome! Let's draw it
        var sceneryMagicTable = new MagicTable($("#scenery")[0], width, height, 4);

        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);
        var offset = 0;
        setInterval(function() {
            map.drawArea(offset++);
        }, 100);
        
        // Replace this later with map or some function. Ask sven
        var fakeMap = function(){return ""};

        // The last layer is the background. 
        var backgroundMagicTable = new MagicTable($("#background")[0], width, height, 4);

        // This is you! Yeah!
        var yourPlayer = new Player(fakeMap, width);

        // We store all players in a dedicated list
        var playerList = new PlayerList(yourPlayer, server, fakeMap);

        // This manages the viewport
        var camera = new Camera(57, gameTimer, yourPlayer);

        // This instanciates the table that is used for displaying players
        var playerMagicTable = new MagicTable($("#players")[0], width, height, 4);

        // The PlayerRenderer draws the players
        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, playerMagicTable);

        // Fancy background!
        //var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
        
        // Start the timer!
        gameTimer.start();

        // Initiate your player with the current gametime, position and stuff
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(width/2), y: 0, v: 20, dx: 0});
        
        // Fake controls!
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