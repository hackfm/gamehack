var yourPlayer;

(function($) {
    $(document).ready(function() {

        var width = 48;
        var height = 57;
        var pixelSize = 8;
        
        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(30);
        
        

        // This object communicates with the server
        var server = new FakeServer();
        //var server = new Server();

        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log("Gametime:",gameTimer.getGameTime());
        });


        // Scenery is awesome! Let's draw it
        var sceneryMagicTable = new MagicTable($("#scenery")[0], width, height, pixelSize);

        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);
        /*map.drawArea(0);

        var offset = 0;
        setInterval(function() {
            map.drawArea(offset++);
        }, 1000);*/
        
        // Replace this later with map or some function. Ask sven
        var fakeMap = function(){return ""};

        // The last layer is the background. 
        var backgroundMagicTable = new MagicTable($("#background")[0], width, height, pixelSize);

        // This is you! Yeah!
        var yourPlayer = new Player(fakeMap, width);

        // We store all players in a dedicated list
        var playerList = new PlayerList(yourPlayer, server, fakeMap);


        var camera = new Camera(width, height, gameTimer, yourPlayer);


        //var playerMagic = new MagicCanvas(playersElem, width, height);
        var playerMagicTable = new MagicTable($("#players")[0], width, height, pixelSize);
        var playerRenderer = new PlayerRenderer(playerList, gameTimer, camera, playerMagicTable);

        var backgroundElem = $("#players")[0];
        //var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, backgroundElem);

        // Fancy background!
        //var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
                
        gameTimer.start();
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(width/2), y: 0, v: 10, dx: 0});

        // Fake controls!
        var KEY_LEFT = 37;
        var KEY_RIGHT = 39;
        var lastKey = 0;

        $('body').keydown(function(e) {
            if (lastKey == e.keyCode) {
                return;
            }
            lastKey = e.keyCode;
            if (e.keyCode == KEY_LEFT) {
                yourPlayer.createEvent(gameTimer.getGameTime(), 'left');
                console.log(gameTimer.getGameTime(), 'left', yourPlayer);
            }
            if (e.keyCode == KEY_RIGHT) {
                yourPlayer.createEvent(gameTimer.getGameTime(), 'right');
            }
        }).keyup(function(e) {
            yourPlayer.createEvent(gameTimer.getGameTime(), 'straight');
            lastKey = 0;
        });
       

    })
})(jQuery);