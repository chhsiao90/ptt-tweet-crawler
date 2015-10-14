import { combineReducers } from "redux";
import { userContentStatus } from "./userContentStatus";

// {
//   userContentStatus: {
//     userContents: [
//       user: string,
//       type: string,
//       content: string,
//       showHistories: boolean,
//       postHistoriesMaxPage: number,
//       postHistoriesPage: number,
//       postHistories: [
//         postDate: date,
//         title: string
//       ],
//       tweetHistoriesMaxPage: number,
//       tweetHistoriesPage: number,
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
