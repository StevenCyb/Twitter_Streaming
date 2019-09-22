class TweetProcessing {
    constructor(liveTweetView, topHashtagsView) {
        this.liveTweetView = liveTweetView;
        this.listOfTweets = [];
        this.rankingChart = new RankingChart(topHashtagsView);
    }

    createHtmlView(tweet) {
        var profileUrl = "default_profil.png", createdAt = [], id = "", filter_level = "";
        if(!tweet.user.default_profile_image) {
            if(tweet.user.profile_image_url.length > 16) {
                profileUrl = tweet.user.profile_image_url;
            } else if(tweet.user.profile_image_url_https.length > 16) {
                profileUrl = tweet.user.profile_image_url_https;
            }
        }
        if(tweet.tweet.filter_level == "low") {
            filter_level = "style=\"color: var(--blue-highlight)\"";
        } else if(tweet.tweet.filter_level == "medium") {
            filter_level = "style=\"color: var(--yellow-highlight)\"";
        } else if(tweet.tweet.filter_level == "high") {
            filter_level = "style=\"color: var(--red-highlight)\"";
        }
        createdAt = tweet.tweet.created_at.split(' ');
        id = tweet.user.screen_name+createdAt[3].replace(new RegExp(':', 'g'), "");
        this.listOfTweets.push(id);
        this.liveTweetView.innerHTML = "<li id=\"" + id + "\" class=\"tweet\">"
        + "<table><tr><td rowspan=\"2\"><img src=\"" + profileUrl + "\"><td>"
        + "<td><span class=\"filter_level\" " + filter_level + ">&#9679;</span><span  class=\"name\">" + tweet.user.screen_name + "</span><span class=\"created-at\">(" + (createdAt[2]+" "+createdAt[1]+" "+createdAt[5]+" "+createdAt[3]) + ")</span>"
        + "<tr><td></td><td class=\"text\">" + tweet.tweet.text.replace(new RegExp('\r', 'g'), "").replace(new RegExp('\n', 'g'), "") + "</td></tr>"
        + "</td></tr></table></li>" + this.liveTweetView.innerHTML;
        while(this.listOfTweets.length > 50) {
            document.getElementById(this.listOfTweets[0]).remove();
            this.listOfTweets.shift();
        }
    }

    push(tweet) {
        this.createHtmlView(tweet);
        var hashtags = tweet.tweet.text.match(/\#([0-9a-zA-Z_-]*)/g);
        if(hashtags != undefined) {
            hashtags.forEach(hashtag => {
                if(hashtag.length > 1) {
                    this.rankingChart.push(hashtag);
                }
            });
        }
    }
}