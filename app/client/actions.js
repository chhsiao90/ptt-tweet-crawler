import { List } from "immutable";
import { SHOW_ARTICLE, SHOW_USER_HISTORIES, HIDE_USER_HISTORIES } from "./constants/actionType";
import { NEXT_USER_POST_HISTORIES, NEXT_USER_TWEET_HISTORIES } from "./constants/actionType";
import * as pttClient from "./api/ptt-client";

export function recieveUserHistories(userContentIndex, postHistories, tweetHistories, postHistoriesPage, tweetHistoriesPage) {
    return {
        type: SHOW_USER_HISTORIES,
        userContentIndex,
        postHistories,
        tweetHistories,
        postHistoriesPage,
        tweetHistoriesPage
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
            pttClient.getUserPostHistories(user, 1),
            pttClient.getUserTweetHistories(user, 1),
            pttClient.getUserPostHistoriesPage(user),
            pttClient.getUserTweetHistoriesPage(user)
        ]).then(function(values) {
            console.log("show user histories: %s", values);
            dispatch(recieveUserHistories(userContentIndex, values[0], values[1], values[2], values[3]));
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
                        .set("tweetHistories", [])
                        .set("postHistoriesPage", 1)
                        .set("tweetHistoriesPage", 1)
                        .set("postHistoriesMaxPage", 1)
                        .set("tweetHistoriesMaxPage", 1));
            }
            dispatch(recieveUserContents(updatedUserContents));
        });
    };
};

export function recieveNextUserPostHistories(userContentIndex, postHistories, page) {
    return {
        type: NEXT_USER_POST_HISTORIES,
        userContentIndex,
        postHistories,
        page: page + 1
    };
};

export function recieveNextUserTweetHistories(userContentIndex, tweetHistories, page) {
    return {
        type: NEXT_USER_TWEET_HISTORIES,
        userContentIndex,
        tweetHistories,
        page: page + 1
    };
};

export function nextUserPostHistories(userContentIndex, user, page) {
    return dispatch => {
        pttClient.getUserPostHistories(user, page).then(function(postHistories) {
            dispatch(recieveNextUserPostHistories(userContentIndex, postHistories, page));
        }); 
    };
};

export function nextUserTweetHistories(userContentIndex, user, page) {
    return dispatch => {
        pttClient.getUserTweetHistories(user, page).then(function(tweetHistories) {
            dispatch(recieveNextUserTweetHistories(userContentIndex, tweetHistories, page));
        }); 
    };
};

export function hideUserHistories(userContentIndex) {
    return {
        type: HIDE_USER_HISTORIES,
        userContentIndex
    };
}
