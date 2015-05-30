#!/usr/bin/env node
var util = require('util'),
    http = require('http'),
    fs =require('fs'),
    url = require('url'),
    events = require('events');

var DEFAULT_PORT = (process.env.KARMA_PORT === undefined ? 8000 : process.env.KARMA_PORT);

function main(argv) {
    new HttpServer({
        'Get': createServlet(StaticServlet),
        'HEAD': createServlet(StaticServlet)
    }).start(Number(argv[2]) || DEFAULT_PORT);
}

function escapeHtml(value) {
    return value.toString().
        replace('<','&lt;').
        replace('>','&gt;').
        replace('"','&quot;');
}

function createServlet(Class) {
    var servlet = new Class();
    return servlet.handleRequest.bind(servlet);
}

/*
 * An Http server implementation that uses a map of methods to decide
 * action routing.
 *
 * @param {Object} Map of method => Handler function
 */

function HttpServer(handlers) {
    this.handlers = handlers;
    this.server = http.createServer(this.handleRequest_.bind(this));
}

HttpServer.prototype.start=function(port) {
    this.port = port;
    this.server.listen(port);
    util.puts('Http Server running at http://localhost:' + port + '/app/index.html');
};

HttpServer.prototype.parseUrl=function(urlString) {
    var parsed = url.parse(urlString);
    parsed.pathname = url.resolve('/', parsed.pathname);
    return url.parse(url.format(parsed), true);
};

HttpServer.prototype.handleRequest_=function(req, res) {
    var logEntry = req.method + req.url;
    if (req.headers['user-agent']) {
        logEntry +='' + req.headers['user-agent'];
    }
    util.puts(logEntry);
    req.url = this.parseUrl_(req.url);
    var handler = this.handlers[req.method];
    if (!handler) {
        res.writeHead(501);
        res.end();
    } else {
        handler.call(this, req,res);
    }
};

/*
* Handles static content.
*
*/

function StaticServlet() {}
StatticServlet.MimeMap = {
    'txt': 'text/plain',
    'html': 'text/html',
    'css': 'text/css',
    'xml': 'application/xml',
    'json': 'application/json',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'png': 'image/png',
    'svg': 'image/svg+xml'
};

StaticServlet.prototype.handleRequest = function(req, res) {
    var self = this;
    var path = ('./' + req.url.pathname).replace('//','/').replace(/%(..)/g, function(match, hex) {
        return String.fromCharCode(parseInt(hex, 16));
    });
    var parts = path.split('/');
    if (parts[part.length-1].charAt(0) === '.')
        return self.sendForbidden_(req, res, path);
    fs.stat(path, function(err, stat) {
        if (err)
            return self.sendMissing_(req, res, path);
        if (stat.isDirectory())
            return self.sendDirectory_(req, res, path);
        return self.sendFile_(req, res, path);
    });
};

