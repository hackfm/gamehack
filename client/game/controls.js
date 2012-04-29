var Controls = function(player, gameTimer) {
    
    var KEY_LEFT = 37;
    var KEY_RIGHT = 39;


    var leftPressed = false;
    var rightPressed = false;

    var leftButton = $('<a href="#" class="phoneButton leftButton"></a>');
    var RightButton = $('<a href="#" class="phoneButton rightButton"></a>');

    $(document.body).append(leftButton).append(RightButton);

    $(".phoneButton").mousedown(function(e) {
        e.preventDefault()
        if ($(e.target).hasClass('leftButton')) {
            player.createEvent(gameTimer.getGameTime(), 'left');    
        } else {
            player.createEvent(gameTimer.getGameTime(), 'right');    
        }
    })

    $(".phoneButton").mouseup(function(e) {
        player.createEvent(gameTimer.getGameTime());    
    });


    var keyDownHandler = function(evt) {
        switch(evt.keyCode) {
            case KEY_LEFT:
                if (!leftPressed) {
                    leftPressed = true;
                    player.createEvent(gameTimer.getGameTime(), 'left');                    
                }
                break;
            case KEY_RIGHT:
                if (!rightPressed) {  
                    rightPressed = true;
                    player.createEvent(gameTimer.getGameTime(), 'right');
                }
                break;
        }
    }

    var keyUpHandler = function(evt) {
        switch(evt.keyCode) {
            case KEY_LEFT:
                if (leftPressed) {
                    leftPressed = false;
                    player.createEvent(gameTimer.getGameTime());
                }                    
                break;
            case KEY_RIGHT:
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