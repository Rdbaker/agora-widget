import React from 'react';

import './style.css';

export default ({
  type="primary",
  size="medium",
  className="",
  children,
  onClick,
  submit=true,
}) => (
  type === "link" ?
  <a className={`agora-button agora-button-${type} agora-button-${size} ${className}`} onClick={onClick}>
    {children}
  </a>
  :
  <button type={submit ? 'submit' : 'button'} className={`agora-button agora-button-${type} agora-button-${size} ${className}`} onClick={onClick}>
    {children}
  </button>
);