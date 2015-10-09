var application = {};

application.ptt = {};
application.ptt.util = {};
application.ptt.indexer = {};
application.datasource = {};

application.ptt.baseUrl = 'https://www.ptt.cc';
application.ptt.homePage = 'http://www.ptt.cc/bbs/Gossiping/index.html';
application.ptt.header = {
    'Cookie': 'over18=1'
};

application.ptt.indexer.interval = 10;
application.ptt.indexer.urlFormat = 'http://www.ptt.cc/bbs/Gossiping/index%d.html';

application.ptt.util.prePageRegex = / 上頁$/;
application.ptt.util.tweetDateRegex = /\d{2}\/\d{2}/;

application.datasource.mongodb = 'mongodb://localhost/test';

export default application; 
