import React from 'react';

const IconClose = ({ stroke, strokeWidth, height, width }) => {
  stroke = stroke || '#FFFFFF';
  strokeWidth = strokeWidth || '2';
  height = `${height}px` || '18px';
  width = `${width}px` || '18px';
  return (
    <svg className="icon-close" width={width} height={height} viewBox="0 0 18 18">
      <path d="M0,0 L18,18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"></path>
      <path d="M18,0 L0,18" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round"></path>
    </svg>
  );
};

export default IconClose;
