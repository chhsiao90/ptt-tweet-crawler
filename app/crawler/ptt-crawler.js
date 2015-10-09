import Crawler from "Crawler";
import util from "util";
import app from "../config/application";

const baseUrl = app.ptt.baseUrl;
const header = app.ptt.header;
var options = {
    maxConnections: 1,
    headers: header,
    rateLimits: 1000
};
var c = new Crawler(options);

export function getArticles(startPageNumber, endPageNumber, matchDate) {
    assert.ok(startPageNumber >= endPageNumber, 'end page index must lower then start page index');
    var result = [];
    var currentPageNumber = startPageNumber;
    return new Promise(function(resolve, reject) {
        var callback = function($) {
            currentPageNumber--;
            var articles = pageToArticles($);
            articles.forEach(function(article) {
                if (article.postDate === matchDate) {
                    result.push(article);
                }
            });
            console.log("current: %d, end: %d, articles sum: %d", currentPageNumber, endPageNumber, result.length);
            if (currentPageNumber >= endPageNumber) {
                call(formatUrlWithPageNumber(currentPageNumber), callback);
            } else {
                resolve(result);
            }
        };
        call(formatUrlWithPageNumber(currentPageNumber), callback);
    });
};

export function indexer(startPageNumber, times, interval = app.ptt.indexer.interrval) {
    const urlFormat = app.ptt.indexer.urlFormat;
    return new Promise(function(resolve, reject) {
        var result = [];
        var successCount = 0;
        for (var i = 0; i < times; i++) {
            const currentPageNumber = startPageNumber + i * interval;
            call(formatUrlWithPageNumber(currentPageNumber), function($, url) {
                const cacheCurrentPageNumber = currentPageNumber;
                var article = toArticle($('#main-container .r-ent').first());
                result.push({
                    pageNumber: cacheCurrentPageNumber,
                    date: article.postDate
                });
                console.log("page number: %d => %s", currentPageNumber, article.postDate); 
                if (++successCount == times) {
                    resolve(result);
                }
            });
        }
    });
};

export function getTweetsInArticle(article) {
    return new Promise(function(resolve, reject) {
        call(baseUrl + article.uri, function($, url) {
            resolve(getTweets($));
        });
    });
};

function formatUrlWithPageNumber(pageNumber) {
    const urlFormat = app.ptt.indexer.urlFormat;
    return util.format(urlFormat, pageNumber);
}

function call(url, callback) {
    console.log("call url: " + url);
    c.queue({
        uri: url,
        callback: function(error, result, $) {
            if (!error && result.statusCode == 200) {
                callback($, url);
            }
        }
    });
};

function pageToArticles($) {
    var resultArticles = [];
    var $firstArticle = $('#main-container .r-ent').first();
    resultArticles.push(toArticle($firstArticle));
    $firstArticle.nextUntil('.r-list-sep').each(function(index, div) {
        const article = toArticle($(div));
        resultArticles.push(article);
    });
    return resultArticles;
}

function toArticle($article) {
    var article = {};
    article.uri = $article.find('.title > a').attr('href');
    article.title = $article.find('.title > a').text();
    article.postDate = $article.find('.meta > .date').text().trim();
    article.author = $article.find('.meta > .author').text();
    return article;
}

function getPrePageUri($) {
    var prePageUri;
    const prePageRegex = app.ptt.util.prePageRegex;
    $('a.btn').each(function(index, btn) {
        const $btn = $(btn);
        const btnText = $btn.text();
        if (prePageRegex.test(btnText)) {
            prePageUri = $btn.attr('href');
        }
    });
    if (prePageUri === undefined) {
        throw "no pre page url found";
    }
    return prePageUri;
}

function getTweets($) {
    var tweets = [];
    const tweetDateRegex = app.ptt.util.tweetDateRegex;
    $('.push').each(function(index, push) {
        var $push = $(push);
        var tweet = {};
        tweet.tag = $push.find('.push-tag').text().trim();
        tweet.userid = $push.find('.push-userid').text();
        tweet.content = $push.find('.push-content').text();
        tweet.tweetDate = tweetDateRegex.exec($push.find('.push-ipdatetime').text());
        tweets.push(tweet);
    });
    return tweets;
}
