import restify from "restify";
import app from "./config/application";
import Article from "./models/Article";

const tweetPageSize = app.ptt.server.tweetPageSize;
const postPageSize = app.ptt.server.postPageSize;

export function startServer() {
    var server = restify.createServer({
        name: 'ptt-tweet-server',
        version: '1.0.0'
    });
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    
    server.get('/:user/post', function(req, res, next) {
        const user = req.params.user;
        const page = parseInt(req.params.page);
        Article
            .find({ author: user })
            .select({ _id: 0, postDate: 1, title: 1, uri: 1 })
            .skip(postPageSize * (page - 1))
            .limit(postPageSize)
            .exec(function(err, result) {
                if(err) throw err;
                res.send(result);
                next();
        });
    });
    server.get('/:user/tweet', function(req, res, next) {
        const user = req.params.user;
        const page = parseInt(req.params.page);
        Article
            .find({ 'tweets.userid': user })
            .skip(tweetPageSize * (page - 1))
            .limit(tweetPageSize)
            .select({
                _id: 0,
                postDate: 1,
                title: 1,
                "tweets.tweetDate": 1,
                "tweets.content": 1,
                tweets: {
                    $elemMatch: { userid: user }
                }
            })
            .exec(function(err, articles) {
                if(err) throw err;
                var tweets = [];
                articles.forEach(function(article) {
                    tweets = tweets.concat(article.tweets.map(function(tweet) {
                        return {
                            postDate: article.postDate,
                            tweetDate: tweet.tweetDate,
                            title: article.title,
                            content: tweet.content
                        };
                    }));
                });
                res.send(tweets);
                next();
        });
    });
    server.get('/:user/tweet/page', function(req, res, next) {
        const user = req.params.user;
        Article
            .find({ 'tweets.userid': user })
            .count(function(err, count) {
                res.send({
                    page: toMaxPage(count, tweetPageSize)
                });
                next();
        });
    });
    server.get('/:user/post/page', function(req, res, next) {
        const user = req.params.user;
        Article
            .find({ author: user })
            .count(function(err, count) {
                res.send({
                    page: toMaxPage(count, postPageSize)
                });
                next();
        });
    });
    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};

function toMaxPage(count, pageSize) {
    return Math.ceil(count / pageSize);
}
