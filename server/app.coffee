### 
    Game hack server
###

url        = require 'url'
path       = require 'path'
fs         = require 'fs'
mapHelper  = require './mapHelper.functions'
PlayerList = require './PlayerList'

# MIME Types
mimeTypes = 
    html: "text/html"
    jpeg: "image/jpeg"
    jpg:  "image/jpeg"
    png:  "image/png"
    js:   "text/javascript"
    css:  "text/css"
    mp3:  "audio/mpeg"

app = require('http').createServer (req, res) ->
    uri = url.parse(req.url).pathname
    query = url.parse(req.url, true).query

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
        res.writeHead 200, {'Content-Type':mimeType}
        fileStream = fs.createReadStream filename
        fileStream.pipe res     

# Port stuff, start the webserver
args = process.argv.splice 2
if args.length < 1 
    port = 8080
else
    port = args[0]
port = Number port
if isNaN port 
    port = 8080 

portSocket = port + 1

console.log 'Listening on port', port, 'and', portSocket
app.listen port 
         
# Game time starts here:
gameTimeZero = new Date().getTime()/1000

# List of players
playerList = new PlayerList()

# Socket Server
## start socket io
io = require('socket.io').listen portSocket
io.sockets.on 'connection', (socket) =>

    playerId = null
    # send gametime
    socket.emit 'startGame', { y: playerList.getStartY(), gametime: (new Date().getTime()/1000) - gameTimeZero}

    socket.on 'playerEvent', (data) =>
        playerId = data.id
        playerList.getAddEventForPlayer data.id, data.event

    eventBroadcastEvent = (id, event) =>
        if id isnt playerId
            socket.emit 'playerEventBroadcast', { id: id, event:event}

    playerList.on 'playerEventBroadcast', eventBroadcastEvent

    socket.on 'playerDead', (data) =>
        playerList.deletePlayer  data.id


    removePlayerBroadcastEvent = (id) =>
        socket.emit 'removePlayerBroadcast', id

    playerList.on 'removePlayerBroadcast', removePlayerBroadcastEvent

    socket.on 'disconnect', () =>
        playerList.removeListener 'playerEventBroadcast', eventBroadcastEvent
        playerList.removeListener 'removePlayerBroadcast', removePlayerBroadcastEvent

    socket.on 'sendY', (y) =>
        playerList.setY y


