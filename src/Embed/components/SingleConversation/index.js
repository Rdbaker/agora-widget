import React, { Component, Fragment } from 'react';

import Button from 'components/shared/Button';
import Composer from 'containers/Composer';
import Header from 'containers/Header';
import Message from 'containers/Message';

import './style.css';


const Views = {
  CONVERSATION: 'Conversation',
  LOGIN: 'Login',
  SIGNUP: 'Sign Up',
}


class SingleConversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      messageIds,
      isLoggedIn,
    } = this.props;

    return (
      <Fragment>
        <div className="agora-single-conversation-messages--container">
          {messageIds.map(messageId => <Message id={messageId} key={messageId} />)}
        </div>
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