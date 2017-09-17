import React from 'react';

const IconClose = ({ color, strokeWidth, width, height }) => {
  color = color || '#FFFFFF';
  strokeWidth = strokeWidth || '2';
  width = width || "18px";
  height = height || "18px";
  return (
    <svg className="icon-close" width={width} height={height} viewBox="0 0 18 18">
      <path d="M0,0 L18,18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"></path>
      <path d="M18,0 L0,18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"></path>
    </svg>
  );

};

export default IconClose;
