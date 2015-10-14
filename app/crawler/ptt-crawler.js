import Crawler from "Crawler";
import util from "util";
import moment from "moment";
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
    var results = [];
    for (var currentPageNumber = startPageNumber; currentPageNumber <= endPageNumber; currentPageNumber++) {
        var resultPromise = call(formatUrlWithPageNumber(currentPageNumber))
            .then(function($) {
                var articles = pageToArticles($);
                return articles.filter(a => a.postDate === matchDate);
        });
        results.push(resultPromise);
    }
    return Promise.all(results).then(function(values) {
        return values.reduce(function(pre, curr) {
            return pre.concat(curr);
        });
    });
};

export function getStartPageAndEndPage(dateStr) {
    var date = moment(new Date(dateStr));
    return new Promise(function(resolve, reject) {
        traversePages(false, date, 10000, 1000)
            .then(function(firstPageNumber) {
            traversePages(true, date, firstPageNumber, 100)
                .then(function(secondPageNumber) {
                traversePages(false, date, secondPageNumber, 10)
                    .then(function(thirdPageNumber) {
                    resolve({
                        startPageNumber: thirdPageNumber,
                        endPageNumber: secondPageNumber
                    });
                });
            });
        });
    });
};

function traversePages(asc, date, currentPageNumber, pageInterval) {
    return new Promise(function(resolve, reject) {
        call(formatUrlWithPageNumber(currentPageNumber))
            .then(function($) {
                var article = toArticle($('#main-container .r-ent').first());
                console.log("page number: %d => %s", currentPageNumber, article.postDate); 
                var postMoment = moment(new Date(article.postDate));
                if (asc === true && date.isBefore(postMoment)) {
                    resolve(currentPageNumber);
                }
                else if (asc === false && date.isAfter(postMoment)) {
                    resolve(currentPageNumber);
                }
                else {
                    var nextCurrentPageNumber = asc ? currentPageNumber + pageInterval : currentPageNumber - pageInterval;
                    resolve(traversePages(asc, date, nextCurrentPageNumber, pageInterval));
                }
        });
    });
}

export function getArticleDetail(url) {
    return call(url).then(function($) {
        return retrieveArticleDetail($);
    });
}

function formatUrlWithPageNumber(pageNumber) {
    return util.format('http://www.ptt.cc/bbs/Gossiping/index%d.html', pageNumber);
}

function call(url) {
    console.log("call url: %s", url);
    return new Promise(function(resolve, reject) {
        c.queue({
            uri: url,
            callback: function(error, result, $) {
                console.log("call url finished: %s", url);
                if (!error && result.statusCode == 200) resolve($);
                else reject(error);
            }
        });
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
    $('a.btn').each(function(index, btn) {
        const $btn = $(btn);
        const btnText = $btn.text();
        if (/ 上頁$/.test(btnText)) {
            prePageUri = $btn.attr('href');
        }
    });
    if (prePageUri === undefined) {
        throw "no pre page url found";
    }
    return prePageUri;
}

function retrieveArticleDetail($) {
    var articleDetail = {};
    articleDetail.author = /(.+)\s/.exec($('.article-meta-tag:contains("作者")').next().text())[1];
    articleDetail.title = $('.article-meta-tag:contains("標題")').next().text();
    articleDetail.tweets = [];
    $('.push').each(function(index, push) {
        var $push = $(push);
        var tweet = {};
        tweet.tag = $push.find('.push-tag').text().trim();
        tweet.userid = $push.find('.push-userid').text();
        tweet.content = $push.find('.push-content').text();
        tweet.tweetDate = /\d{2}\/\d{2}/.exec($push.find('.push-ipdatetime').text());
        articleDetail.tweets.push(tweet);
    });
    return articleDetail;
}
