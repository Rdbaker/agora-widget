import { connect } from 'react-redux';
import { branch, compose, renderComponent, renderNothing } from 'recompose';

import SingleConversation from 'containers/SingleConversation';
import { uiType } from 'modules/ui/selectors';
import { IframeViewTypes } from 'modules/ui/constants';


const mapStateToProps = state => ({
  uiType: uiType(state),
})

export default compose(
  connect(mapStateToProps),
  branch(props => props.uiType === IframeViewTypes.SINGLE_CONVERSATION, renderComponent(SingleConversation)),
)(renderNothing)