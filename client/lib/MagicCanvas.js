var MagicCanvas = function(element, width, height, pxSize) {
    var magicCanvas = {};

    var jqElement = $(element);
    var canvas = $('<canvas />')[0];
    canvas.width = width*pxSize;
    canvas.height = height*pxSize;

    magicCanvas.width = width;
    magicCanvas.height = height;


    jqElement.append(canvas);
    var context = canvas.getContext("2d");
    //var imageData = context.createImageData(width, height);

    magicCanvas.clear = function() {
        context.clearRect(0, 0, width*pxSize, height*pxSize);
    }

    magicCanvas.setPixel = function(x, y, rgba) {
        var bigX = x*pxSize;
        var bigY = y*pxSize;
        context.fillStyle = "rgba("+rgba[0]+","+rgba[1]+","+rgba[2]+","+rgba[3]+")";
        context.fillRect(bigX, bigY, pxSize, pxSize);
    }

/*
    magicCanvas.setPixel = function(x, y, rgba) {
        var index = (x + y * width) * 4;
        imageData.data[index+0] = rgba[0];
        imageData.data[index+1] = rgba[1];
        imageData.data[index+2] = rgba[2];
        imageData.data[index+3] = Math.round(rgba[3]*255);
    }
*/
   /* magicCanvas.draw = function() {
        context.putImageData(imageData, 0, 0);
    }*/

    magicCanvas.getElem = function() {
        return $(canvas);
    }

    return magicCanvas;
}