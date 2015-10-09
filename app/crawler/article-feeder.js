import { getArticles } from './ptt-crawler';
import Article from '../models/Article';

export function saveArticles(startPageNumber, endPageNumber, matchDate) {
    return getArticles(startPageNumber, endPageNumber, matchDate).then(function(articles) {
        console.log("get %d articles on %s", articles.length, matchDate);
        articles.forEach(function(articleObj) {
            var article = new Article(articleObj);
            article.save();
        });
        return articles;
    });
};
