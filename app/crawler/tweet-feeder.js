import mongoose from "mongoose";
import { getArticleDetail } from "./ptt-crawler";
import Article from "../models/Article";
import app from "./config/application.js";

var ObjectID = mongoose.Types.ObjectId;
const baseUrl = app.ptt.baseUrl;

export function updateTweetsByDate(date) {
   Article.find({ postDate: date }).find(function(err, articles) {
       articles.forEach(function(article) {
           updateTweets(article);
       }); 
   }); 
};

export function updateTweets(article) {
    const url = baseUrl + article.uri;
    return getArticleDetail(article).then(function(articleDetail) {
        var tweets = articleDetail.tweets;
        console.log("get tweets, size=%d", tweets.length);
        Article.findByIdAndUpdate(article._id,
            { $set: { tweets: tweets }},
            function(err, resp) { console.log("save into mongodb with: %s", resp);}
        );
        return tweets; 
    });
}
