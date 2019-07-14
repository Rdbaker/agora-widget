import { connect } from 'react-redux';
import { path } from 'ramda';


import { getUser } from 'modules/user/selectors';
import MessageGroupComponent from 'components/MessageGroup';
import { setTypeAndMeta } from 'modules/ui/actions';
import { IframeViewTypes } from 'modules/ui/constants';


const mapStateToProps = (state, props) => ({
  author: getUser(state, path(['group', '0', 'author_id'], props)),
  authorIsUser: path(['group', '0', 'author_type'], props) === 'USER',
});

const mapDispatchToProps = dispatch => ({
  showAuthorInfo: message => dispatch(setTypeAndMeta({ type: IframeViewTypes.AUTHOR_INFO, meta: { message } })),
});


export default connect(mapStateToProps, mapDispatchToProps)(MessageGroupComponent);