import mongoose from 'mongoose';
import { getTweetsInArticle } from './ptt-crawler';
import Article from '../models/Article';

var ObjectID = mongoose.Types.ObjectId;

export function updateTweetsByDate(date) {
   Article.find({ postDate: date }).find(function(err, articles) {
       articles.forEach(function(article) {
           updateTweets(article);
       }); 
   }); 
};

export function updateTweets(article) {
    console.log(article);
    return getTweetsInArticle(article).then(function(tweets) {
        console.log("get tweets, size=%d", tweets.length);
        Article.findByIdAndUpdate(article._id,
            { $set: { tweets: tweets }},
            function(err, resp) { console.log("save into mongodb with: %s", resp);}
        );
        return tweets; 
    });
}
