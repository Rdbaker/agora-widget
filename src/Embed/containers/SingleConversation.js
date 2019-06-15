import { connect } from 'react-redux';

import { uiMeta } from 'modules/ui/selectors';
import { messagesNeverFetched, conversationMessages } from 'modules/messages/selectors';
import { fetchMessages } from 'modules/messages/actions';
import { login } from 'modules/auth/actions';
import SingleConversationComponent from 'components/SingleConversation';


const mapStateToProps = state => {
  const conversationId = uiMeta(state).conversationId

  return {
    conversationId,
    messagesNeverFetched: messagesNeverFetched(state, conversationId),
    messages: conversationMessages(state, conversationId),
  }
}

const mapDispatchToProps = dispatch => ({
  fetchConversationMessages: (conversationId, before) => dispatch(fetchMessages({ conversationId, before })),
  login: () => dispatch(login({ username: 'rdbaker', password: 'password' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleConversationComponent)