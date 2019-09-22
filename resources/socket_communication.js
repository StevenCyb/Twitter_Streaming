var socket = null, trackList = [];

function displayTrackList() {
    var trackListElement = document.getElementById("track-list");
    trackListElement.innerHTML= "";
    trackList.forEach(function(track){
        var trackDiv = document.createElement("div");
        trackDiv.classList.add("track");
        trackDiv.innerHTML = track + "<button onclick=\"dropTrack('" + track +"');\" onmouseover=\"dropHoverEnter(this);\" onmouseout=\"dropHoverLeave(this);\">&#10005;</button>";
        trackListElement.appendChild(trackDiv);
    });
}

window.onload = function() {
    var tweetProcessing = new TweetProcessing(document.getElementById("live-tweet-view"),
                                            document.getElementById("top-hashtags-view"));
    socket = io();
    socket.on("initialization", function(data){
        data = data.track_list;
        for (i in data) {
            trackList.push(data[i]);
        }
        displayTrackList();
    });
    socket.on("add_track", function(data){
        trackList.push(data.track);
        displayTrackList();
    });
    socket.on("drop_track", function(data){
        var trackListIndex = trackList.indexOf(data.track);
        if (trackListIndex !== -1) {
            trackList.splice(trackListIndex, 1);
        }
        displayTrackList();
    });
    socket.on("tweet", function(data){
        tweetProcessing.push(data);
    });
};
function addTrack(trackName) {
    if(trackName.length >= 2 && trackName.length <= 25) {
        socket.emit("add_track", {"track":trackName});
        document.getElementById("track-input").value = "";
    }
}
function checkAndFire(event) {
    if (event.keyCode === 13) {
        addTrack(document.getElementById("track-input").value);
    }
}
function dropTrack(trackName) {socket.emit("drop_track", {"track":trackName});}
function dropHoverEnter(buttonElement) {buttonElement.parentNode.style.backgroundColor = "var(--red-highlight)";}
function dropHoverLeave(buttonElement) {buttonElement.parentNode.style.backgroundColor = "var(--green-highlight)";}
