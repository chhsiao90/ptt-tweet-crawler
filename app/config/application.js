var application = {};

application.ptt = {};
application.ptt.util = {};
application.ptt.server = {};
application.datasource = {};

application.ptt.baseUrl = 'https://www.ptt.cc';
application.ptt.homePage = 'http://www.ptt.cc/bbs/Gossiping/index.html';
application.ptt.header = {
    'Cookie': 'over18=1'
};

application.ptt.server.postPageSize = 20;
application.ptt.server.tweetPageSize = 20;

application.datasource.mongodb = 'mongodb://localhost/test';

export default application; 
