var mongoose = require('mongoose');
var app = require('../config/application');
mongoose.connect(app.datasource.mongodb);

const ArticleSchema = mongoose.Schema({
    uri: String,
    title: String,
    postDate: String,
    author: String,
    tweets: [{
        _id: false,
        tag: String,
        userid: String,
        content: String,
        tweetDate: String
    }]
});
var Article = mongoose.model('Article', ArticleSchema);

export default Article;
