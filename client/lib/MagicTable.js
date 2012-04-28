var MagicTable = function(element, width, height, pxSize) {
	var jqElement = $(element);
	var jqTable = $("<table />");
	jqTable.addClass("magicTable");
	jqTable.attr("id", jqElement.attr("id"));
	jqElement.replaceWith(jqTable);
	this.elementArray = [];
	this.width=width;
	this.height=height;
	for (var y=0;y<height;y++) {
		var rowArray = [];
		var row = $(document.createElement("tr"));
		jqTable.append(row);
		for (var x=0; x<width; x++) {
			var cell = $(document.createElement("td"));
			cell.addClass("magicTable");
			cell.css("width",pxSize);
			cell.css("height",pxSize);
			row.append(cell);
			rowArray.push($(cell));
		}
		this.elementArray.push(rowArray);
	}
};

MagicTable.prototype.clear = function() {
	for (var y=0;y<this.height;y++) {
		for (var x=0; x<this.width; x++) {
			this.elementArray[y][x].css("background-color","");
		}
	}
}

MagicTable.prototype.setPixel = function(x,y,rgba) {
	if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
		var col = "rgba("+rgba[0].toString()+","+rgba[1].toString()+","+rgba[2].toString()+","+rgba[3].toString()+")";
		this.elementArray[y][x].css("background-color",col);		
	} else {
		console.log('out')
	}
};
