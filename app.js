var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: process.env.PORT });


console.log("listening port :" + process.env.PORT);
var connections = [];
wss.on('connection', function (ws) {
    console.log('connection');
    connections.push(ws);
    ws.on('message', function (message) {
        console.log('received: %s', message);
        broadcast(23);
    });

    ws.on('close', function() {
        console.log('close');
        connections = connections.filter(function (conn, i) {
            return (conn === ws) ? false : true;
    });
});
});
//ブロードキャストを行う
function broadcast(message) {
    connections.forEach(function (con, i) {
        con.send(message);
    });
};
