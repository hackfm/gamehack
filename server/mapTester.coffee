Map = require './map/Map'
http = require 'http'

# Create a map with seed 1
map = new Map 1

# 
http.createServer  (req, res) ->
    res.writeHead 200, {'Content-Type': 'text/html'}
    text = ''
    for e in map.objects.obstacles
        do (e) =>
            f = 4
            top = e.y1 * f
            left = e.x1 *f
            width = (e.x2 - e.x1) * f 
            height = (e.y2 - e.y1) * f
            text = text + "<div style=\"background-color:red; position:absolute; top:#{top}px; left:#{left}px; width:#{width}px; height:#{height}px;\"></div>"
            
    res.end '<!DOCTYPE html>
<html>
<head>
    <title>HTML5 template</title>
    <meta charset="utf-8" />
    <style type="text/css">
        body {
            position: relative;
        }
    </style>
</head>
<body>'+text+'
    
</body>
</html>'
.listen 8080, '127.0.0.1'