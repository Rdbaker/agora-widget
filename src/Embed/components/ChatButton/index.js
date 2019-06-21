import React from 'react';

import './style.css';

const waitForAnimationThenOpen = (openChat, conversationId) => {
  return () => setTimeout(() => openChat(conversationId), 60);
}

const ChatButton = ({
  openChat,
  conversationId,
}) => (
  <div onClick={waitForAnimationThenOpen(openChat, conversationId)} className="agora-chat-button-container">
  </div>
);

export default ChatButton;