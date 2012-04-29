var yourPlayer;

(function($) {
    $(document).ready(function() {

        var globalSpeed = 20;

        var MagicRenderer = MagicCanvas;

        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(30);

        // This object communicates with the server
        var server = new Server();

        // Let's wait for the server before doing anything....
        server.onStartCallback(function (gTime, startY) {

            gameTimer.setGameTime(gTime);


            // Width, Height, Pixel size
            var camera = new Camera(48, 57, 8, gameTimer);

            $('#game').css('width', camera.width * camera.pixelSize);

            // Scenery is awesome! Let's draw it
            var sceneryMagicTable = new MagicRenderer($("#scenery")[0], camera.width, camera.height, camera.pixelSize);
            // Map are drawn in the scenery Table and they talk to the server.
            var map = new Map(server, sceneryMagicTable);
            
            var mapCheckFunction = function(x, y){
                return map.getPixel(x, y);
            };

            // This is you! Yeah!
            var yourPlayer = new Player(mapCheckFunction, camera.width, globalSpeed, function (event) {
                
                console.log('hereh');
                if (event.obstacle) {
                    // You are dead! 
                    server.sendPlayerDead(playerList.id);
                    // TODO: Remove key handlers
                    alert('YOU ARE MASH!');
                    window.location.reload();
                }
                else
                {
                    server.playerEventCallback(playerList.id, event);
                }
                
            }, gameTimer.getGameTime() + 3);
            camera.setFocusPlayer(yourPlayer);
            camera.onUpdateMap(function(offsetY, score) {
                map.drawArea(offsetY);
                var score_string = score.toFixed();
                while (score_string.length < 6)
                {
                    score_string = "0"+score_string;
                }
                $("#score").text("SCORE "+score_string);
            })
            
            // We store all players in a dedicated list
            var playerList = new PlayerList(yourPlayer, server, mapCheckFunction, globalSpeed);        
            server.onPlayerEventBroadcastCallback(playerList.updatePlayer);

            //var playerMagic = new MagicCanvas(playersElem, width, height);
            var playerMagicTable = new MagicRenderer($("#players")[0], camera.width, camera.height, camera.pixelSize);
            var playerRenderer = new PlayerRenderer(playerList, gameTimer, camera, playerMagicTable);

            var backgroundElem = $("#background")[0];

            var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, backgroundElem, MagicRenderer);
                    
            yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(camera.width/2), y: 0, v: 1, dx: 0});

            var controls = new Controls(yourPlayer, gameTimer);


            console.log ('start at', startY);
            yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(camera.width/2), y: startY, v: 1, dx: 0});
            
            // Start the timer!
            gameTimer.start();
        });        


    })
})(jQuery);