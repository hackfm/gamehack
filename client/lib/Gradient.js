var Gradient = function() {
	function smoothBlend(c1,c2,p) {
		return {
			r: Math.floor(c1.r*p+c2.r*(1-p)),
			g: Math.floor(c1.g*p+c2.g*(1-p)),
			b: Math.floor(c1.b*p+c2.b*(1-p))
		};
	}
	function randomDither(c1,c2,p) {
		if (Math.random()<p) {
			return c1;
		} else {
			return c2;
		}
	}
	var bayerGrid = [[3,7,4],[6,1,9],[2,8,5]];
	function bayerDither(c1,c2,p,x,y,colourSteps) {
		var quantisedP = Math.floor((p+(bayerGrid[x%3][y%3]/(10*colourSteps)))*colourSteps)/colourSteps
		return smoothBlend(c1,c2,quantisedP);
	}
	
	function render(c1,c2,colourSteps,element) {
		var context = element.getContext("2d");
		var imageData = context.createImageData(element.width, element.height);
		var pixels = imageData.data;
		for (var y=0;y<element.height;y++) {
			var proportion = y/element.height;
			for (var x=0;x<element.width;x++) {
				var offset = (y*element.width+x)*4;
			
				var c = bayerDither(c1,c2,proportion,x,y,colourSteps)
			
				pixels[offset]=c.r;
				pixels[offset+1]=c.g;
				pixels[offset+2]=c.b;
				pixels[offset+3]=255;
			}
		}
		context.putImageData(imageData,0,0);
	}
	function renderMagicTable(c1,c2,colourSteps,magicTable) {
		for (var y=0;y<magicTable.height;y++) {
			var proportion = y/magicTable.height;
			for (var x=0;x<magicTable.width;x++) {
				var offset = (y*magicTable.width+x)*4;
				
				var c = bayerDither(c1,c2,proportion,x,y,colourSteps);
				
				magicTable.setPixel(x,y,[c.r, c.g, c.b, 1]);
			}
		}
	}
	return {
		"render": render,
		"renderMagicTable": renderMagicTable
	};
}();
