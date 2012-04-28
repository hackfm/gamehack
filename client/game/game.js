var yourPlayer;

(function($) {
    $(document).ready(function() {

        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(3);

        // This object communicates with the server
        var server = new FakeServer();
        //var server = new Server();

        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log("Gametime:",gameTimer.getGameTime());
        });

        // Width, Height, Pixel size
        var camera = new Camera(48, 57, 8, gameTimer);


        // Scenery is awesome! Let's draw it
        var sceneryMagicTable = new MagicTable($("#scenery")[0], camera.width, camera.height, camera.pixelSize);

        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);
        map.drawArea(0);

        var offset = 0;
        setInterval(function() {
            map.drawArea(offset++);
        }, 100);
        
        // Replace this later with map or some function. Ask sven
        var fakeMap = function(){return ""};


        // This is you! Yeah!
        var yourPlayer = new Player(fakeMap, camera.width);
        camera.setFocusPlayer(yourPlayer);
        
        // We store all players in a dedicated list
        var playerList = new PlayerList(yourPlayer, server, fakeMap);        


        //var playerMagic = new MagicCanvas(playersElem, width, height);
        var playerMagicTable = new MagicTable($("#players")[0], camera.width, camera.height, camera.pixelSize);
        var playerRenderer = new PlayerRenderer(playerList, gameTimer, camera, playerMagicTable);

        var backgroundElem = $("#background")[0];
        //var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, backgroundElem);

                
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(camera.width/2), y: 0, v: 10, dx: 0});

        // Start the timer!
        gameTimer.start();

        // Initiate your player with the current gametime, position and stuff
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(camera.width/2), y: 0, v: 20, dx: 0});
        
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
        }, 1000)

    })
})(jQuery);