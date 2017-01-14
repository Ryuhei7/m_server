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
