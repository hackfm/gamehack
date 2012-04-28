### 
    Game hack server
###


url        = require 'url'
path       = require 'path'
fs         = require 'fs'

# MIME Types
mimeTypes = 
    html: "text/html"
    jpeg: "image/jpeg"
    jpg:  "image/jpeg"
    png:  "image/png"
    js:   "text/javascript"
    css:  "text/css"


app = require('http').createServer (req, res) ->
    console.log 'here'
    uri = url.parse(req.url).pathname; 
    query = url.parse(req.url, true).query;
    # TODO: check some special case uris
    console.log uri

    if uri is '/'
        uri = '/index.html'

    # no special case, so use the filesystem
    filename = path.join process.cwd()+"/../client/", uri

    path.exists filename, (exists) ->
        unless exists
            console.log "not exists: " + filename
            res.writeHead 404, {'Content-Type': 'text/plain'}
            res.write '404 Not Found\n'
            res.end('not found')   
            return
        mimeType = mimeTypes[path.extname(filename).split(".")[1]]
        res.writeHead 200, mimeType
        fileStream = fs.createReadStream filename
        fileStream.pipe res
        
        

# Port stuff, start the webserver
args = process.argv.splice(2);
if args.length < 1 
    port = 8080
else
    port = args[0]
port = Number(port)
if isNaN port 
    port = 8080 

portSocket = port + 1;

console.log 'Listening on port', port, 'and', portSocket
app.listen port 
         
# Game time starts here:
gameTimeZero = new Date().getTime()/1000

# Socket Server
## start socket io
io = require('socket.io').listen portSocket
io.sockets.on 'connection', (socket) ->
    socket.emit 'gametime', { gametime: (new Date().getTime()/1000) - gameTimeZero }
    #socket.on 'my other event', (data) ->
    #    console.log data



