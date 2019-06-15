import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ChatButton from 'containers/ChatButton';
import Sidebar from 'containers/Sidebar';
import * as UIActions from 'modules/ui/actions';
import *  as SharedEventTypes from 'shared/eventTypes';
import * as UISelectors from 'modules/ui/selectors';

import './AgoraEmbed.css';


class AgoraEmbed extends Component {
  constructor(props) {
    super(props)
    window.addEventListener("message", this.receiveMessage, false);
  }

  receiveMessage = (event) => {
    if(this.isAgoraEvent(event)) {
      this.props.dispatch({ type: event.data.type, payload: event.data.value });
    }
  }

  isAgoraEvent = (event) => {
    return !!event && event.data && event.data.type && event.data.type in SharedEventTypes;
  }

  render() {
    const {
      isHidden,
      showChatButton,
      showSidebar,
    } = this.props

    if (isHidden) {
      return null;
    }

    return (
      <div className="App">
        {showChatButton && <ChatButton />}
        {showSidebar && <Sidebar />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setViewAndType: UIActions.setViewAndType,
  }, dispatch),
  dispatch,
})

const mapStateToProps = state => ({
  isHidden: UISelectors.uiHidden(state),
  showChatButton: UISelectors.showChatButton(state),
  showSidebar: UISelectors.showSidebar(state),
})


export default connect(mapStateToProps, mapDispatchToProps)(AgoraEmbed);
