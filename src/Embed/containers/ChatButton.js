import { connect } from 'react-redux';

import ChatButtonComponent from 'components/ChatButton';
import { setViewTypeAndMeta, changeContainerClass } from 'modules/ui/actions';
import { IframeViews, IframeViewTypes } from 'modules/ui/constants';
import { SIDEBAR_CLASSNAME } from 'shared/iframeClasses';


const mapDispatchToProps = dispatch => ({
  openChat: (conversationId) => {
    dispatch(setViewTypeAndMeta({
      view: IframeViews.SIDEBAR,
      type: IframeViewTypes.SINGLE_CONVERSATION,
      meta: { conversationId },
    }))
    dispatch(changeContainerClass(SIDEBAR_CLASSNAME))
  }
})

const mapStateToProps = state => ({
  conversationId: state.org.org.conversations[0].id,
})


export default connect(mapStateToProps, mapDispatchToProps)(ChatButtonComponent)