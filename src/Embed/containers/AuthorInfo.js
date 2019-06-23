import { connect } from 'react-redux';

import { uiMeta } from 'modules/ui/selectors';
import { getUser } from 'modules/user/selectors';
import { setTypeAndMeta } from 'modules/ui/actions';
import { IframeViewTypes } from 'modules/ui/constants';
import AuthorInfoComponent from 'components/AuthorInfo';


const mapStateToProps = state => {
  const message = uiMeta(state).message;

  return {
    message,
    author: getUser(state, message.author_id),
  }
}

const mapDispatchToProps = dispatch => ({
  returnToConversation: (conversationId) => {
    dispatch(setTypeAndMeta({
      type: IframeViewTypes.SINGLE_CONVERSATION,
      meta: { conversationId },
    }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorInfoComponent)