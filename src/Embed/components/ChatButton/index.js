import React, { Component } from 'react';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/pro-regular-svg-icons';

import './style.css';


class ChatButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isTransitioning: false,
    };
  }

  transition = () => {
    this.setState({ isTransitioning: true },
    () => setTimeout(() => this.props.openChat(this.props.conversationId), 80))
  }

  render() {
    const {
      isTransitioning,
    } = this.state;

    return (
      <div onClick={this.transition} className={cx("agora-chat-button-container", { transition: isTransitioning })}>
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>
    )
  }
}


export default ChatButton;