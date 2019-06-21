import { connect } from 'react-redux';

import Message from 'components/Message';
import { getMessage } from 'modules/messages/selectors';
import { getUser } from 'modules/user/selectors';


const mapStateToProps = (state, { id }) => {
  const message = getMessage(state, id);
  return {
    message,
    author: getUser(state, message.author_id),
  };
};

export default connect(mapStateToProps)(Message)