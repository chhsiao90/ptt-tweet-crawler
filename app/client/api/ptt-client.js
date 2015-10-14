import restify from "restify";
import util from "util";
import immutable from "immutable";
import * as pttCrawler from "../../crawler/ptt-crawler";

console.log(pttCrawler);

var client = restify.createJsonClient({
    url: "http://localhost:8080",
    version: '1.0.0'
});

export function getUserTweetHistories(user, page) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/tweet?page=%d", user, page), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                console.log("get %s tweet: %s", user, obj);
                resolve(immutable.fromJS(obj));
            }
        });
    });
};

export function getUserPostHistories(user, page) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/post?page=%d", user, page), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                console.log("get %s post: %s", user, obj);
                resolve(immutable.fromJS(obj));
            }
        });
    });
};

export function getUserTweetHistoriesPage(user) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/tweet/page", user), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                resolve(obj.page);
            }
        });
    });
};

export function getUserPostHistoriesPage(user) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/post/page", user), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                resolve(obj.page);
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
            content: articleDetail.title
        });
        articleDetail.tweets.forEach(function(tweet) {
            userContents.push({
                user: tweet.userid,
                type: "tweet",
                content: tweet.content
            });
        });
        return immutable.fromJS(userContents);
    });
};
