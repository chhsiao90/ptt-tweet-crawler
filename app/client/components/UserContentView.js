import React, { Component, PropTypes } from "react";
import { showUserHistories } from "../actions";

class UserContentView extends Component {
    onClickShowUser() {
        const { dispatch, userContent, userContentIndex } = this.props;
        dispatch(showUserHistories(userContentIndex, userContent.user));
    }
    render() {
        const { userContent } = this.props;
        return (
            <div>
              <div class={userContent.type} onClick={this.onClickShowUser.bind(this)}>
                <span>{userContent.type}</span> 
                <span>{userContent.user}</span> 
                <span>{userContent.content}</span> 
              </div>
              <div>
                <div>Post: </div>
                {userContent.postHistories.map(postHistory =>
                  <div>
                    <span>{postHistory.postDate}</span>
                    <span>{postHistory.title}</span>
                  </div>
                )}
              </div>
              <div>
                <div>Tweet: </div>
                {userContent.tweetHistories.map(tweetHistory =>
                  <div>
                    <span>{tweetHistory.postDate}</span>
                    <span>{tweetHistory.title}</span>
                    <span>{tweetHistory.tweetDate}</span>
                    <span>{tweetHistory.content}</span>
                  </div>
                )}
              </div>
            </div>
        );
    }
}

UserContentView.displayName = "UserContentView";
UserContentView.propTypes = {
    dispatch: PropTypes.func.isRequired,
    userContent: PropTypes.object.isRequired,
    userContentIndex: PropTypes.number.isRequired
};

export default UserContentView;
