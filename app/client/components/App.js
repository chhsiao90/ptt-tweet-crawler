import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { showUserContents, showUserHistories } from "../actions";

import UserContentView from "./UserContentView";

class App extends Component {
    onClickDisplay() {
        const { dispatch } = this.props;
        dispatch(showUserContents(this.refs.urlInput.getDOMNode().value));
    }

    render() {
        const { dispatch, userContentStatus } = this.props;
        return (
            <div>
              <div>
                <input ref="urlInput" />
                <button type="button" onClick={this.onClickDisplay.bind(this)}>
                  Display
                </button>
              </div>
              <div>
                {userContentStatus.userContents.map((userContent, userContentIndex) =>
                    <UserContentView
                      userContent={userContent}
                      userContentIndex={userContentIndex}
                      dispatch={dispatch}>
                    </UserContentView>
                )}
              </div>
            </div>
        );
    }
}

App.displayName = "App";
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userContentStatus: PropTypes.object.isRequired 
};

function select(state) {
    return {
        userContentStatus: state.userContentStatus.toJS()
    };
}

export default connect(select)(App);
