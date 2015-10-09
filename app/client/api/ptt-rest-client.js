var restify = require('restify');
var app = require('../../config/application');

var client = restify.createJsonClient({
    url: 'http://localhost:8080',
    version: '1.0.0'
});

export function getUserTweetHistories(user) {
    return new Promise(function(resolve, reject) {
        client.get(util.format("/%s/tweet", user), function(err, req, res, obj) {
            if (err) reject(err);
            else {
                resolve(obj);
            }
        });
    });
};
