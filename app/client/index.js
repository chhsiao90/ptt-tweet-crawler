import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import pttCrawlerApp from "./reducers";
import App from "./components/App";

console.log(pttCrawlerApp);

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(pttCrawlerApp);
const rootElement = document.getElementById("app");

React.render(
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    rootElement
);
