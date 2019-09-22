var NodeTweetStream = require('node-tweet-stream')

class TfTweetStream {
    constructor() {}

    start(credentials, socketServer) {
        this.nodeTweetStream = new NodeTweetStream({
            consumer_key: credentials.consumer_key,
            consumer_secret: credentials.consumer_secret,
            token: credentials.access_token_key,
            token_secret: credentials.access_token_secret
        });
        var nodeTweetStream = this.nodeTweetStream;
        nodeTweetStream.on('tweet', function (tweet) {
            socketServer.broadcastTweet({
                "user": {
                    "name": tweet.user.name, 
                    "screen_name": tweet.user.screen_name,
                    "default_profile_image": tweet.user.default_profile_image, 
                    "followers_count": tweet.user.followers_count,
                    "friends_count": tweet.user.friends_count, 
                    "profile_image_url": tweet.user.profile_image_url, 
                    "profile_image_url_https": tweet.user.profile_image_url_https, 
                    "verified": tweet.user.verified
                },
                "tweet": {
                    "created_at": tweet.created_at,
                    "lang": tweet.lang, 
                    "favorite_count": tweet.favorite_count, 
                    "favorited": tweet.favorited,
                    "quote_count": tweet.quote_count, 
                    "reply_count": tweet.reply_count, 
                    "retweet_count": tweet.retweet_count, 
                    "filter_level": tweet.filter_level,
                    "truncated": tweet.truncated, 
                    "text": tweet.text
                }
            });
        });
        nodeTweetStream.on('error', function (err) {
            console.log('Twitter Error', err);
        });
        socketServer.trackList.forEach(function(trackName){
            nodeTweetStream.track(trackName)
        });
    }

    addTrack(trackName) {
        this.nodeTweetStream.track(trackName)
    }

    dropTrack(trackName) {
        this.nodeTweetStream.untrack(trackName)
    }
}

module.exports = TfTweetStream