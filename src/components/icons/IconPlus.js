import React from 'react';

const IconPlus = ({ color, strokeWidth, width }) => {
  color = color || '#434650';
  strokeWidth = strokeWidth || '2';
  width = width || "10px";
  return (
    <svg className="icon-plus" viewBox="0 0 18 18" width={width}>
      <line className="icon-plus-path" x1="9" y1="0" x2="9" y2="18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line className="icon-plus-path" x1="0" y1="9" x2="18" y2="9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );

};

export default IconPlus;
