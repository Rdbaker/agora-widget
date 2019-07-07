import React, { Component, Fragment, useRef, useLayoutEffect, useCallback, useState } from 'react';
import useStayScrolled from 'react-stay-scrolled';

import Button from 'components/shared/Button';
import Composer from 'containers/Composer';
import Header from 'containers/Header';
import MessageGroup from 'containers/MessageGroup';
import LoadingDots from 'components/shared/LoadingDots';

import './style.css';


const Views = {
  CONVERSATION: 'Conversation',
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
}


const ConversationContainer = ({
  messageGroups,
  notifyNewMessage,
  setNotifyNewMessage,
  messagesFetchPending,
  fetchConversationMessages,
}) => {
  const numMessages = messageGroups.reduce((prevLength, group) => prevLength + group.length, 0);
  const ref = useRef();

  const { stayScrolled, isScrolled } = useStayScrolled(ref);

    // The element just scrolled down - remove new messages notification, if any
  const onScroll = useCallback(() => {
    if (isScrolled()) setNotifyNewMessage(false);
  }, []);

  useLayoutEffect(() => {
    // Tell the user to scroll down to see the newest messages if the element wasn't scrolled down
    setNotifyNewMessage(!stayScrolled());
  }, [messageGroups]);

  return (
    <div className="agora-single-conversation-messages--container" onScroll={onScroll} ref={ref}>
      {messagesFetchPending && <div className="agora-single-conversation-show-more--loading">Loading<LoadingDots /></div>}
      {numMessages % 35 === 0 && <div className="agora-single-conversation-message-show-more" onClick={() => fetchConversationMessages(conversationId, messageGroups[0][0].created_at)}>Show more</div>}
      {messageGroups.map((messageGroup, i) => {
        const group = <MessageGroup group={messageGroup} key={i} />;
        if (i === 0) {
          const firstMessage = messageGroup[0];
          if (!firstMessage) return group;

          const sentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
          return (
            <div key={i}>
              <div>
                <div className="agora-single-conversation-date-break--line"></div>
                <div className="agora-single-conversation-date-break--date">{sentDate.toDateString()}</div>
              </div>
              {group}
            </div>
          );
        } else {
          const lastGroup = messageGroups[i - 1];
          const lastFirstMessage = lastGroup[0];
          const firstMessage = messageGroup[0]
          if (!firstMessage || !lastFirstMessage) return group;

          const firstMessageSentDate = new Date(Date.parse(`${firstMessage.created_at}Z`));
          const lastFirstMessageSentDate = new Date(Date.parse(`${lastFirstMessage.created_at}Z`));

          if (firstMessageSentDate.getDate() !== lastFirstMessageSentDate.getDate()) {
            return (
              <div key={i}>
                <div className="agora-single-conversation-date-break--container">
                  <div className="agora-single-conversation-date-break--line"></div>
                  <div className="agora-single-conversation-date-break--date">{firstMessageSentDate.toDateString()}</div>
                </div>
                {group}
              </div>
            );
          } else {
            return group;
          }
        }
      })}
      {notifyNewMessage && <div>Scroll down to new message</div>}
    </div>
  );
}


class SingleConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifyNewMessage: false,
      view: Views.CONVERSATION,
      username: '',
      password: '',
    }
  }

  componentDidMount() {
    if (this.props.messagesNeverFetched) {
      this.props.fetchConversationMessages(this.props.conversationId);
    }
  }

  componentDidUpdate(prevProps) {
    // check if we got logged in
    if (this.state.view !== Views.CONVERSATION && !prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.setState({
        view: Views.CONVERSATION
      });
    }
  }

  loginClick = () => this.setState({ view: Views.LOGIN })
  signupClick = () => this.setState({ view: Views.SIGNUP })
  cancelClick = () => this.setState({ view: Views.CONVERSATION })
  onUsernameChange = (e) => this.setState({ username: e.target.value })
  onPasswordChange = (e) => this.setState({ password: e.target.value })
  setNotifyNewMessage = (val) => this.setState({ notifyNewMessage: val })

  onSubmit = (e) => {
    const {
      username,
      password,
      view,
    } = this.state;

    const {
      login,
      signup,
    } = this.props;

    e.preventDefault();

    if (view === Views.SIGNUP) {
      signup({ username, password });
    } else {
      login({ username, password });
    }
  }

  renderConversation = () => {
    const {
      messageGroups,
      fetchConversationMessages,
      conversationId,
      messagesFetchPending,
      isLoggedIn,
    } = this.props;

    return (
      <Fragment>
        <ConversationContainer
          messageGroups={messageGroups}
          fetchConversationMessages={fetchConversationMessages}
          conversationId={conversationId}
          messagesFetchPending={messagesFetchPending}
          setNotifyNewMessage={this.setNotifyNewMessage}
          notifyNewMessage={this.state.notifyNewMessage}
        />
        <div className="agora-single-conversation-composer--container">
          {isLoggedIn && <Composer />}
          {!isLoggedIn && (
            <div>
              <Button type="link" onClick={this.loginClick}>Login</Button> or <Button type="link" onClick={this.signupClick}>Signup</Button> to chat
            </div>
          )}
        </div>
      </Fragment>
    )
  }

  renderLoginOrSignup = () => {
    const {
      username,
      password,
      view,
    } = this.state;

    const {
      loginOrSignupFailed,
      authError,
    } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Button type="link" onClick={this.cancelClick}>&lt; back</Button>
        <h4>{view}</h4>
        <div>
          <label>Username</label>
          <input value={username} placeholder="username" onChange={this.onUsernameChange} />
        </div>
        <div>
          <label>Password</label>
          <input value={password} placeholder="password" onChange={this.onPasswordChange} type="password" />
        </div>
        <Button size="small" submit={true}>{view}</Button>
        {loginOrSignupFailed && authError instanceof Array && authError.map((error, i) => <div key={i} className="agora-signup-error">{error}</div>)}
      </form>
    )
  }

  render() {
    const {
      view
    } = this.state;

    return (
      <div className="agora-sidebar--container">
        <div className="agora-single-conversation-header--container"><Header /></div>
        {view === Views.CONVERSATION && this.renderConversation()}
        {view === Views.LOGIN && this.renderLoginOrSignup()}
        {view === Views.SIGNUP && this.renderLoginOrSignup()}
      </div>
    )
  }
}

export default SingleConversation