import React, { Component, PropTypes } from "react";
import { showUserHistories, hideUserHistories } from "../actions";
import { Row, Col, Table, Panel } from "react-bootstrap";

class UserContentView extends Component {
    onClickShowUser() {
        const { dispatch, userContent, userContentIndex } = this.props;
        if (!userContent.showHistories) dispatch(showUserHistories(userContentIndex, userContent.user));
        else dispatch(hideUserHistories(userContentIndex));
    }

    render() {
        const { userContent } = this.props;
        const panelHeader = (
            <div onClick={this.onClickShowUser.bind(this)}>
              <Row> 
                <Col xs={2}>{userContent.type}</Col> 
                <Col xs={4}>{userContent.user}</Col> 
                <Col xs={6}>{userContent.content}</Col> 
              </Row>
            </div>
        );
        return (
            <div>
              <Panel header={panelHeader} collapsible expanded={userContent.showHistories}> 
                <div>
                  <div>Post: </div>
                  <Table striped>
                    <tr>
                      <th>Post Date</th>
                      <th>Title</th>
                    </tr>
                    {userContent.postHistories.map(postHistory =>
                      <tr>
                        <td>{postHistory.postDate}</td>
                        <td>{postHistory.title}</td>
                      </tr>
                    )}
                  </Table>
                </div>
                <div>
                  <div>Tweet: </div>
                  <Table striped>
                    <tr>
                      <th>Post Date</th>
                      <th>Title</th>
                      <th>Tweet Date</th>
                      <th>Content</th> 
                    </tr>
                    {userContent.tweetHistories.map(tweetHistory =>
                      <tr>
                        <td>{tweetHistory.postDate}</td>
                        <td>{tweetHistory.title}</td>
                        <td>{tweetHistory.tweetDate}</td>
                        <td>{tweetHistory.content}</td>
                      </tr>
                    )}
                  </Table>
                </div>
              </Panel>
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
