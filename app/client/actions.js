import { List } from "immutable";
import { SHOW_ARTICLE, SHOW_USER_POST_HISTORIES, SHOW_USER_TWEET_HISTORIES } from "./constants/actionType";
import * as pttClient from "./api/ptt-client";

export function recieveUserPostHistories(userContentIndex, postHistories) {
    return {
        type: SHOW_USER_POST_HISTORIES,
        userContentIndex,
        postHistories
    };
};

export function recieveUserTweetHistories(userContentIndex, tweetHistories) {
    return {
        type: SHOW_USER_TWEET_HISTORIES,
        userContentIndex,
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
        pttClient.getUserTweetHistories(user).then(function(tweetHistories) {
            dispatch(recieveUserTweetHistories(userContentIndex, tweetHistories));
        });
        pttClient.getUserPostHistories(user).then(function(postHistories) {
            dispatch(recieveUserPostHistories(userContentIndex, postHistories));
        });
    };
};

export function showUserContents(url) {
    return dispatch => {
        pttClient.getUserContents(url).then(function(userContents) {
            dispatch(recieveUserContents(userContents));
        });
    };
};
