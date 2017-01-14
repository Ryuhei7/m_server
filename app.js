var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: process.env.PORT });

console.log("listening port :" + process.env.PORT);
var connections = [];
wss.on('connection', function (ws) {
    console.log('connection');
    connections.push(ws);
    ws.on('message', function (message) {
      var id;
        for(var i = 0;i<3;i++){
          if(connections[i]==ws){
            id = ws;
          }
        }
        var split = message.split(",");
        split[0] = Math.floor(Math.pow(parseInt(split[0], 10),2) / parseInt(split[0],10)*10);
        split[1] = Math.floor(Math.pow(parseInt(split[1], 10),2) / parseInt(split[1],10)*10);
        var message = split[0]+","+split[1]+","+ id;
        console.log('received: %s', message);
        broadcast(message);
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
