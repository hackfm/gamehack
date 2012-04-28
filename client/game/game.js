var yourPlayer;

(function($) {
    $(document).ready(function() {

        var width = 48;
        var height = 57;

        // This objects connects to the server. That's pretty important, huh?!
        var gameTimer = new GameTimer(3);
        

        var server = new FakeServer();
        server.onGametime(function(gTime) {
            gameTimer.setGameTime(gTime);
            console.log("Gametime:",gameTimer.getGameTime());
        });


        // Scenery is awesome! Let's draw it
        /*var sceneryMagicTable = new MagicTable($("#scenery")[0], width, height, 4);

        // Map are drawn in the scenery Table and they talk to the server.
        var map = new Map(server, sceneryMagicTable);
        map.drawArea(0);*/

        // The last layer is the background. 
        var backgroundMagicTable = new MagicTable($("#background")[0], width, height, 4);

        var yourPlayer = new Player(function(){return ""}, width);


        var camera = new Camera(width, height, gameTimer, yourPlayer);

        var playersElem = $("#players")[0];
        //var playerMagic = new MagicCanvas(playersElem, width, height);
        var playerMagic = new MagicTable(playersElem, width, height, 4);
        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, playerMagic);

        var backgroundElem = $("#players")[0];
        //var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, backgroundElem);
        

        
// //        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
// >>>>>>> 3fa19999c4eb1a2d2afe878ef64945be7820aba5
        
        gameTimer.start();
        yourPlayer.addEvent({t: gameTimer.getGameTime(), x: Math.round(width/2), y: 0, v: 10, dx: 0});
        /*
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
*/
    })
})(jQuery);