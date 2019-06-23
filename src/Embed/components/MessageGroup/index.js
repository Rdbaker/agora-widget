import React, { Component } from 'react';

import './style.css';


class MessageGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authorInfoOpen: false,
    }
  }

  toggleAuthorInfoOpen = () => this.setState(prevState => ({ authorInfoOpen: !prevState.authorInfoOpen }));

  render() {
    const {
      group,
      author,
      showAuthorInfo,
    } = this.props;

    const firstMessage = group[0];

    if (!firstMessage) return null;

    const firstMessageCreatedAt = Date.parse(`${firstMessage.created_at}Z`);

    return (
      <div className="message-group--container">
        <div className="message-group-header--container">
          <div className="message-group-header--author" onClick={() => showAuthorInfo(firstMessage)}>
            {author.username}
          </div>
          <div className="message-group-header--time">
            {(new Date(firstMessageCreatedAt)).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <div className="message-group-body--container">
          {group.map(message => <div className="message-group-message-body">{message.body}</div>)}
        </div>
      </div>
    )
  }
}


export default MessageGroup;