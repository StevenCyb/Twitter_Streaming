const SocketIo = require("socket.io");

class TfSocketServer {
    constructor() {
        this.trackList = ["nodejs", "node.js", "javascript", "c++", "c#", "python", "java"];
    }

    start(webserver, tweetStream) {
        this.server = SocketIo(webserver);
        console.log("Socket-Server is running");
        this.server.on("connection", socket => {
            socket.on("disconnect", function(){});
            socket.emit("initialization", {"track_list": this.trackList});
            socket.on("add_track", data => {
                var trackName = data.track;
                if(trackName.length >= 2 && trackName.length <= 25 && (this.trackList.indexOf(trackName) == -1)) {
                    this.trackList.push(trackName);
                    tweetStream.addTrack(trackName);
                    socket.emit("add_track", {"track":trackName});
                    socket.broadcast.emit("add_track", {"track":trackName});
                }
            });
            socket.on("drop_track", data => {
                var trackName = data.track;
                var trackListIndex = this.trackList.indexOf(trackName);
                if (trackListIndex !== -1) {
                    this.trackList.splice(trackListIndex, 1);
                    tweetStream.dropTrack(trackName);
                }
                socket.emit("drop_track", {"track":trackName});
                socket.broadcast.emit("drop_track", {"track":trackName});
            });
        });
    }

    broadcastTweet(tweet) {
        this.server.emit('tweet', tweet);
    }
}

module.exports = TfSocketServer