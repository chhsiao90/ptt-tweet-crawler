var restify = require('restify');
var Article = require('./models/Article');

export function startServer() {
    var server = restify.createServer({
        name: 'ptt-tweet-server',
        version: '1.0.0'
    });
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    
    server.get('/helloworld', function(req, res, next) {
        res.send('hellowwolrd');
        next();
    });
    server.get('/:user/post', function(req, res, next) {
        Article.
            find({ author: req.params.user }).
            select({ _id: 0, postDate: 1, title: 1, uri: 1 }).
            exec(function(err, result) {
                if(err) throw err;
                res.send(result);
                next();
        });
    });
    server.get('/:user/tweet', function(req, res, next) {
        Article.
            find({ 'tweets.userid': req.params.user }).
            select({ _id: 0, postDate: 1, title: 1,  "tweets.tweetDate": 1, "tweets.content": 1 }).
            exec(function(err, articles) {
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

    server.listen(8080, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
};
