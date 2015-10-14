import { getStartPageAndEndPage, getArticles } from './ptt-crawler';
import Article from '../models/Article';

export function saveArticles(date) {
    return new Promise(function(resolve, reject) {
        getStartPageAndEndPage(date).then(function(pageResult) {
            getArticles(pageResult.startPageNumber, pageResult.endPageNumber, date)
                .then(function(articles) {
                console.log("get %d articles on %s", articles.length, date);
                articles.forEach(article => new Article(article).save());
                resolve(articles);
            }, function(err) {
                reject(err);
            });
        }, function(err) {
            reject(err);
        });
    });
};
