import { Map } from "immutable";
import { SHOW_ARTICLE } from "../constants/actionType";

const articleInitialStatus = Map({
    url: ""
});

export function articleStatus(state = articleInitialState, action) {
    switch (action.type) {
    case SHOW_ARTICLE:
        return state.set(url, action.url);
    default:
        return state;
    }
};
