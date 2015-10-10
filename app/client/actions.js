import { List } from "immutable";
import { SHOW_ARTICLE, SHOW_USER_HISTORIES, HIDE_USER_HISTORIES } from "./constants/actionType";
import * as pttClient from "./api/ptt-client";

export function recieveUserHistories(userContentIndex, postHistories, tweetHistories) {
    return {
        type: SHOW_USER_HISTORIES,
        userContentIndex,
        postHistories,
        tweetHistories
    };
};

export function recieveUserContents(userContents) {
    return {
        type: SHOW_ARTICLE,
        userContents
    };
};

export function showUserHistories(userContentIndex, user) {
    return dispatch => {
        Promise.all([
            pttClient.getUserPostHistories(user),
            pttClient.getUserTweetHistories(user)
        ]).then(function(values) {
            console.log("show user histories: %s", values);
            dispatch(recieveUserHistories(userContentIndex, values[0], values[1]));
        });
    };
};

export function showUserContents(url) {
    return dispatch => {
        pttClient.getUserContents(url).then(function(userContents) {
            var updatedUserContents = userContents;
            for (var index = 0; index < userContents.size; index++) {
                updatedUserContents = updatedUserContents.update(index,
                    userContent => userContent.set("showHistories", false)
                        .set("postHistories", [])
                        .set("tweetHistories", []));
            }
            dispatch(recieveUserContents(updatedUserContents));
        });
    };
};

export function hideUserHistories(userContentIndex) {
    return {
        type: HIDE_USER_HISTORIES,
        userContentIndex
    };
}
