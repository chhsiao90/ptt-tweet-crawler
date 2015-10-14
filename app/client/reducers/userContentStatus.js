import immutable from "immutable";
import { SHOW_ARTICLE, SHOW_USER_HISTORIES, HIDE_USER_HISTORIES } from "../constants/actionType";
import { NEXT_USER_POST_HISTORIES, NEXT_USER_TWEET_HISTORIES } from "../constants/actionType";

const userContentInitialState = immutable.fromJS({
    userContents: []
});

export function userContentStatus(state = userContentInitialState, action) {
    switch (action.type) {
    case SHOW_USER_HISTORIES:
        return state.updateIn(["userContents", action.userContentIndex], userContent => {
            return userContent
                .set("tweetHistories", action.tweetHistories)
                .set("postHistories", action.postHistories)
                .set("showHistories", true)
                .set("tweetHistoriesMaxPage", action.tweetHistoriesPage)
                .set("postHistoriesMaxPage", action.postHistoriesPage);
        });
    case HIDE_USER_HISTORIES:
        return state.setIn(["userContents", action.userContentIndex, "showHistories"], false);
    case SHOW_ARTICLE:
        return state.set("userContents", action.userContents);
    case NEXT_USER_POST_HISTORIES:
        return state
            .updateIn(["userContents", action.userContentIndex, "postHistories"],
                postHistories => postHistories.concat(action.postHistories))
            .setIn(["userContents", action.userContentIndex, "postHistoriesPage"], action.page);
    case NEXT_USER_TWEET_HISTORIES:
        return state
            .updateIn(["userContents", action.userContentIndex, "tweetHistories"],
                tweetHistories => tweetHistories.concat(action.tweetHistories))
            .setIn(["userContents", action.userContentIndex, "tweetHistoriesPage"], action.page);
    default:
        return state;
    }
};
