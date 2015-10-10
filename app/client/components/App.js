import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Grid, Button, Input, PageHeader } from "react-bootstrap";

import { showUserContents, showUserHistories } from "../actions";

import UserContentView from "./UserContentView";

class App extends Component {
    onClickDisplay() {
        const { dispatch } = this.props;
        dispatch(showUserContents(this.refs.urlInput.getValue()));
    }

    render() {
        const { dispatch, userContentStatus } = this.props;
        return (
            <Grid fluid={true}>
              <PageHeader>Ptt Crawler</PageHeader>
              <Input type="text" ref="urlInput" />
              <Button type="button" onClick={this.onClickDisplay.bind(this)}>
                Display
              </Button>
              <div>
                {userContentStatus.userContents.map((userContent, userContentIndex) =>
                    <UserContentView
                      userContent={userContent}
                      userContentIndex={userContentIndex}
                      dispatch={dispatch}>
                    </UserContentView>
                )}
              </div>
            </Grid>
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
