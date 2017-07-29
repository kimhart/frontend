import React from 'react';

const IconClose = ({ color, strokeWidth }) => {
  color = color || '#FFFFFF';
  strokeWidth = strokeWidth || '2';
  return (
    <svg className="icon-close" width="18px" height="18px" viewBox="0 0 18 18">
      <path d="M0,0 L18,18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"></path>
      <path d="M18,0 L0,18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"></path>
    </svg>
  );

};

export default IconClose;
