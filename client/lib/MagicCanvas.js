var MagicCanvas = function(element, width, height, pxSize) {
    var magicCanvas = {};

    var jqElement = $(element);
    var canvas = $('<canvas />')[0];
    canvas.width = width;
    canvas.height = height;

    jqElement.replaceWith(canvas);
    var context = canvas.getContext("2d");
    var imageData = context.createImageData(width, height);

    magicCanvas.clear = function() {
        context.clearRect(0, 0, width, height);
    }    

    magicCanvas.setPixel = function(x, y, rgba) {
        index = (x + y * imageData.width) * 4;
        imageData.data[index+0] = rgba[0];
        imageData.data[index+1] = rgba[1];
        imageData.data[index+2] = rgba[2];
        imageData.data[index+3] = rgba[3];
    }

    magicCanvas.draw = function() {
        ccanvas.putImageData(imageData, 0, 0);
    }

    return magicCanvas;
}