import React from 'react';

import './style.css';

const ChatButton = ({
  openChat,
  conversationId,
}) => (
  <div onClick={() => openChat(conversationId)} className="agora-chat-button-container">
  </div>
);

export default ChatButton;