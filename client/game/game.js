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

        var gameTimer = new GameTimer(30);

        var yourPlayer = new Player(function(){return ""}, width);

        var camera = new Camera(57, gameTimer, yourPlayer);

        var playersElem = $("#players")[0];
        //var playerMagicCanvas = new MagicCanvas(playersElem, width, height);
        var playerMagicTable = new MagicTable(playersElem, width, height, 4);
        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, playerMagicTable);

//        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
        
        gameTimer.start();
        yourPlayer.addEvent({t: gameTimer.gameTime, x: Math.round(width/2), y: 0, v: 20, dx: 0});
        
        var fakeControls = setInterval(function() {
            var action;
            var ran = Math.random();
            if (ran > 0.6) {
                action = 'right'
            } else if (ran > 0.3) {
                action = 'left';
            }
            yourPlayer.createEvent(gameTimer.gameTime, action);        
        }, 500)

    })
})(jQuery);