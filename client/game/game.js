var yourPlayer;

(function($) {
    $(document).ready(function() {

        var globalSpeed = 20;

        var MagicRenderer = MagicTable;

        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(30);

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
        var sceneryMagicTable = new MagicRenderer($("#scenery")[0], camera.width, camera.height, camera.pixelSize);
        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);
        
        var mapCheckFunction = function(x, y){
            return map.getPixel(x, y);
        };

        // This is you! Yeah!
        var yourPlayer = new Player(mapCheckFunction, camera.width, globalSpeed);
        camera.setFocusPlayer(yourPlayer);
        camera.onUpdateMap(function(offsetY) {
            map.drawArea(offsetY);
        })
        
        // We store all players in a dedicated list
        var playerList = new PlayerList(yourPlayer, server, mapCheckFunction, globalSpeed);        


        //var playerMagic = new MagicCanvas(playersElem, width, height);
        var playerMagicTable = new MagicRenderer($("#players")[0], camera.width, camera.height, camera.pixelSize);
        var playerRenderer = new PlayerRenderer(playerList, gameTimer, camera, playerMagicTable);

        var backgroundElem = $("#background")[0];
        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, backgroundElem, MagicRenderer);
                
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(camera.width/2), y: 0, v: 1, dx: 0});

        var controls = new Controls(yourPlayer, gameTimer);

        // Start the timer!
        gameTimer.start();


    })
})(jQuery);