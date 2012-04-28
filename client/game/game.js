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

        var gameTimer = new GameTimer(3);

        var camera = new Camera(57, gameTimer, yourPlayer);

        var playersElem = $("#players")[0];
        var playerMagicCanvas = new MagicCanvas(playersElem, 48, 57);
        //var playerMagicTable = new MagicTable(playersElem, 48, 57, 4);
        var playerRenderer = new PlayerRenderer([yourPlayer], gameTimer, camera, playerMagicCanvas);

//        var backgroundRenderer = new BackgroundRenderer(gameTimer, camera, playerCanvas);
        
        gameTimer.start();
        
    })
})(jQuery);