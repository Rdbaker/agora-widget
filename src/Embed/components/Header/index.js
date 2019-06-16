import React from 'react';

import './style.css';


const Header = ({
  onClose,
}) => (
  <div className="agora-header-container">
    <div className="agora-header-close-button" onClick={onClose}>&times;</div>
  </div>
)

export default Header;