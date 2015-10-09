import immutable from "immutable";
import { SHOW_ARTICLE, SHOW_USER_POST_HISTORIES, SHOW_USER_TWEET_HISTORIES } from "../constants/actionType";

const userContentInitialState = immutable.fromJS({
    userContents: []
});

export function userContentStatus(state = userContentInitialState, action) {
    switch (action.type) {
    case SHOW_USER_POST_HISTORIES:
        var newUserContent = state.get("userContents").get(action.userContentIndex).set("postHistories", action.postHistories);
        var newUserContents = state.get("userContents").set(action.userContentIndex, newUserContent);
        return state.set("userContents", newUserContents);
    case SHOW_USER_TWEET_HISTORIES:
        var newUserContent = state.get("userContents").get(action.userContentIndex).set("tweetHistories", action.tweetHistories);
        var newUserContents = state.get("userContents").set(action.userContentIndex, newUserContent);
        return state.set("userContents", newUserContents);
    case SHOW_ARTICLE:
        return state.set("userContents", action.userContents);
    default:
        return state;
    }
};
