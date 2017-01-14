var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: process.env.PORT });

console.log("listening port :" + process.env.PORT);

wss.on('connection', function connection(ws) {
    console.log('connection');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        ws.send('Hello from ws');
    });

    ws.on('close', function() {
        console.log('close');
    });
});


var http = require( 'http' ); // HTTPモジュール読み込み
var socketio = require( 'socket.io' ); // Socket.IOモジュール読み込み
var fs = require( 'fs' ); // ファイル入出力モジュール読み込み
var pg = require( 'pg' );
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});server.listen(process.env.PORT || 3000)

var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
  console.log("Connect Server");

    socket.on('xy', function(data) {
       console.log(data[0]);
       console.log(data[1]);
        io.sockets.emit('xy_back', 'success');
        var xy=[Math.floor(data[0]),Math.floor(data[1])];
          ws.send(xy);
        console.log("success");
    });


});
