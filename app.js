var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: process.env.PORT });
var http = require( 'http' );
var server = http.createServer( function( req, res ) {
  //もしURLにファイル名がないならばindex.htmlに飛ばすように
  if(req.url == "/")
    req.url = "/index.html";
  //URLでリクエストされたページをread
  fs.readFile(__dirname + req.url, 'utf-8', function(err, data){
    //もし見つからなかったら404を返す
    if(err){　//err=trueならNot Foundを返します。
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write("Not Found");
      return res.end();　
    }
    //見つかったら表示
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  });
});

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
