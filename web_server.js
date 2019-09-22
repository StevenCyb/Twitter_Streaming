const http = require("http");
const fs = require("fs");

class TfWebServer {
    constructor(port) {
        this.port = port;
        this.server = http.createServer(function(req, res) {
            function sendResource(path, res) {
                fs.readFile(path, function(error, data) {
                    if(error) {
                        fs.readFile("resources/404.html", function(error, data404) {
                            res.writeHead(404, {"Content-Type": "text/html"});
                            if(error) {
                                res.write("File not found.");
                            } else {
                                res.write(data404);
                            }
                            res.end();
                        });
                    } else {
                        if(path.endsWith(".html")) {
                            res.writeHead(200, {"Content-Type": "text/html"});
                        } else if(path.endsWith(".css")) {
                            res.writeHead(200, {"Content-Type": "text/css"});
                        } else if(path.endsWith(".js")) {
                            res.writeHead(200, {"Content-Type": "text/javascript"});
                        }
                        res.write(data);
                        res.end();
                    }
                });
            }
            var path = req.url;
            if(path == "/" || path == "/index.html") {
                path = "index.html";
            }
            sendResource("resources/" + path, res);
        });
    }

    start() {
        var port = this.port;
        this.server.listen(port, function(error){
            if(error) {
                console.log("Web-Server startup error ", error);
            } else {
                console.log("Web-Server is running on port ", port)
            }
        });
    }
}

module.exports = TfWebServer