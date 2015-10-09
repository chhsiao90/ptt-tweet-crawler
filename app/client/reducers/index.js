import { combineReducers } from "redux";
import { userContentStatus } from "./userContentStatus";

// {
//   userContentStatus: {
//     userContents: [
//       user: string,
//       type: string,
//       content: string,
//       postHistories: [
//         postDate: date,
//         title: string
//       ],
//       tweetHistories: [
//         postDate: date,
//         title: string,
//         tweetDate: date,
//         content: string
//       ]
//     ]
//   }
// }

const pttCrawlerApp = combineReducers({
    userContentStatus
});

export default pttCrawlerApp;
