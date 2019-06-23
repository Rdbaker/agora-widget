import React from 'react';

import './style.css';


const Header = ({
  onClose,
  children,
}) => (
  <div className="agora-header-container">
    {children}
    <div className="agora-header-close-button" onClick={onClose}>&times;</div>
  </div>
)

export default Header;