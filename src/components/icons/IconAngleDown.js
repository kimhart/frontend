import React from 'react';

const IconAngleDown = ({ color, strokeWidth, width, height }) => {
  color = color || '#fff';
  strokeWidth = strokeWidth || '2';
  width = width || "18px";
  height = height || "18px"
  return (
    <svg className="icon-angle-down" width={width} height={height} viewBox="0 0 18 18">
        <polyline className="icon-angle-down-path" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" points="0,5.5 9,14.5 18,5.5 "/>
    </svg>
  );

};

export default IconAngleDown;
