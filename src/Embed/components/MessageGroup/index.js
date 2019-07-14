import React, { Component } from 'react';
import cx from 'classnames';

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
      authorIsUser,
    } = this.props;

    const firstMessage = group[0];

    if (!firstMessage) return null;

    const firstMessageCreatedAt = Date.parse(`${firstMessage.created_at}Z`);

    return (
      <div className="message-group--container">
        <div className="message-group-header--container">
          <div className={cx("message-group-header--author", { 'is-user': authorIsUser })} onClick={() => !authorIsUser && showAuthorInfo(firstMessage)}>
            {author.username}{authorIsUser && ` - Admin`}
          </div>
          <div className="message-group-header--time">
            {(new Date(firstMessageCreatedAt)).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
        <div className="message-group-body--container">
          {group.map(message => <div className="message-group-message-body" key={message.id}>{message.body}</div>)}
        </div>
      </div>
    )
  }
}


export default MessageGroup;