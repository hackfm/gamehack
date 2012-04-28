var Controls = function(player, gameTimer) {
    
    var leftPressed = false;
    var rightPressed = false;

    var keyDownHandler = function(evt) {
        switch(evt.keyCode) {
            case 37:
                // left
                if (!leftPressed) {
                    leftPressed = true;
                    player.createEvent(gameTimer.getGameTime(), 'left');                    
                }
                break;
            case 39:
                // right
                if (!rightPressed) {  
                    rightPressed = true;
                    player.createEvent(gameTimer.getGameTime(), 'right');
                }
                break;
        }
    }

    var keyUpHandler = function(evt) {
        switch(evt.keyCode) {
            case 37:
                // left
                if (leftPressed) {
                    leftPressed = false;
                    player.createEvent(gameTimer.getGameTime());
                }                    
                break;
            case 39:
                // right
                if (rightPressed) {
                    rightPressed = false;
                    player.createEvent(gameTimer.getGameTime());                    
                }
                break;
        }
    }

    $(document).keydown(keyDownHandler);
    $(document).keyup(keyUpHandler);
}