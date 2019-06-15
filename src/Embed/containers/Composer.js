import { connect } from 'react-redux';

import { uiMeta } from 'modules/ui/selectors';
import { sendMessage } from 'modules/messages/actions';
import ComposerComponent from 'components/Composer';


const mapStateToProps = state => ({
  conversationId: uiMeta(state).conversationId
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (conversationId, body) => dispatch(sendMessage({ conversationId, body })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposerComponent)