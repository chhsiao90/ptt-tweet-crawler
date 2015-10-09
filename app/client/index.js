import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import chessClock from "./reducers";
import App from "./components/App";

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleware(chessClock);
const rootElement = document.getElementById("app");

React.render(
    <Provider store={store}>
        {() => <App />}
    </Provider>,
    rootElement
);
