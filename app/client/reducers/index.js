import { combineReducers } from "redux";
import { articleStatus } from "./articleStatus";
import { userContentStatus } from "./userContentStatus";

// {
//   articleStatus: {
//     url: string
//   },
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

export default combineReducers({
    articleStatus,
    userContentStatus
});
