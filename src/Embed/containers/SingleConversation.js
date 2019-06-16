import { connect } from 'react-redux';

import { uiMeta } from 'modules/ui/selectors';
import { messagesNeverFetched, conversationMessages } from 'modules/messages/selectors';
import { isLoggedIn } from 'modules/user/selectors';
import { loginOrSignupFailed, authError } from 'modules/auth/selectors';
import { fetchMessages } from 'modules/messages/actions';
import { login, signup } from 'modules/auth/actions';
import SingleConversationComponent from 'components/SingleConversation';


const mapStateToProps = state => {
  const conversationId = uiMeta(state).conversationId

  return {
    conversationId,
    messagesNeverFetched: messagesNeverFetched(state, conversationId),
    messages: conversationMessages(state, conversationId),
    isLoggedIn: isLoggedIn(state),
    loginOrSignupFailed: loginOrSignupFailed(state),
    authError: authError(state),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchConversationMessages: (conversationId, before) => dispatch(fetchMessages({ conversationId, before })),
  login: (payload) => dispatch(login(payload)),
  signup: (payload) => dispatch(signup(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleConversationComponent)