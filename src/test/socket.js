var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(9999);

function handler(req, res) {
    fs.readFile(__dirname + '/proxy.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading proxy.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});