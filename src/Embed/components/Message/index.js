import React, { Component } from 'react';

class Message extends Component {
  render() {
    const {
      message,
      author,
    } = this.props;

    return (
      <div>
        <div>{author.username}</div>
        <div>{message.body}</div>
      </div>
    )
  }
}

export default Message;