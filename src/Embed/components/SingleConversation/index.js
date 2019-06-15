import React, { Component } from 'react';

import './style.css';


class SingleConversation extends Component {
  componentDidMount() {
    this.props.login();
    if (this.props.messagesNeverFetched) {
      this.props.fetchConversationMessages(this.props.conversationId);
    }
  }

  render() {
    const {
      messages,
    } = this.props;

    return (
      <div className="agora-sidebar--container">
        <div className="agora-single-conversation-header--container"></div>
        <div className="agora-single-conversation-messages--container">
          {messages.map(message => <div>{message.body}</div>)}
        </div>
        <div className="agora-single-conversation-composer--container"></div>
      </div>
    )
  }
}

export default SingleConversation