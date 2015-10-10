import immutable from "immutable";
import { SHOW_ARTICLE, SHOW_USER_HISTORIES, HIDE_USER_HISTORIES } from "../constants/actionType";

const userContentInitialState = immutable.fromJS({
    userContents: []
});

export function userContentStatus(state = userContentInitialState, action) {
    switch (action.type) {
    case SHOW_USER_HISTORIES:
        return state.setIn(["userContents", action.userContentIndex, "tweetHistories"], action.tweetHistories)
            .setIn(["userContents", action.userContentIndex, "postHistories"], action.postHistories)
            .setIn(["userContents", action.userContentIndex, "showHistories"], true);
    case HIDE_USER_HISTORIES:
        return state.setIn(["userContents", action.userContentIndex, "showHistories"], false);
    case SHOW_ARTICLE:
        return state.set("userContents", action.userContents);
    default:
        return state;
    }
};
