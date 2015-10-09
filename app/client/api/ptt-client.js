import restify from "restify";
import util from "util";
import immutable from "immutable";
import * as pttCrawler from "../../crawler/ptt-crawler";

console.log(pttCrawler);

var client = restify.createJsonClient({
    url: "http://localhost:8080",
    version: '1.0.0'
});

export function getUserTweetHistories(user) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/tweet", user), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                console.log("get %s tweet: %s", user, obj);
                resolve(obj);
            }
        });
    });
};

export function getUserPostHistories(user) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/post", user), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                console.log("get %s post: %s", user, obj);
                resolve(obj);
            }
        });
    });
};

export function getUserContents(url) {
    return pttCrawler.getArticleDetail(url).then(function(articleDetail) {
        var userContents = [];
        userContents.push({
            user: articleDetail.author,
            type: "article",
            content: articleDetail.title,
            postHistories: [],
            tweetHistories: [] 
        });
        articleDetail.tweets.forEach(function(tweet) {
            userContents.push({
                user: tweet.userid,
                type: "tweet",
                content: tweet.content,
                postHistories: [],
                tweetHistories: [] 
            });
        });
        return immutable.fromJS(userContents);
    });
};
