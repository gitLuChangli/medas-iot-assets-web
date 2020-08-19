var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('./mime');
var path = require('path');

var port = 9001;

function processRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    pathname = decodeURI(pathname);
    if (pathname === '/') {
        pathname = '/index.html';
    }
    var ext = mime(pathname);
    pathname = path.join(__dirname, pathname);
    fs.stat(pathname, (err, stat) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end();
        } else {
            const ifModifiedSince = req.headers['if-modified-since'];
            let lastModified = stat.ctime.toGMTString();
            if (ifModifiedSince === lastModified) {
                res.writeHead(304);
                res.end();
            } else {
                let readStream = fs.createReadStream(pathname);
                res.setHeader('Last-Modified', stat.ctime.toGMTString());
                res.writeHead(200, { 'Content-Type': ext });
                readStream.pipe(res);
            }
        }
    })
}

var server = http.createServer(processRequest);
server.listen(port, () => {
    console.log('http://assets.iot.efoxconn.com created. Port=' + port);
});