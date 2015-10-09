import immutable from "immutable";
import { SHOW_USER_HISTORY } from "../constants/actionType";

const userContentInitialState = immutable.fromJS({
    userContentStatus: {
        userContents: []
    }
});

export function userContentStatus(state = userContentInitialState, action) {
    switch (action.type) {
    case SHOW_USER_HISTORY:
        var newUserContent = state.get("userContentStatus").get(action.userContentIndex);
        newUserContent = newUserContent.set("postHistories", action.postHistories);
        newUserContent = newUserContent.set("tweetHistories", action.tweetHistories);
    default:
        return state;
    }
};
