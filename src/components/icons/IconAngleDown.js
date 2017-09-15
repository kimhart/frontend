import React from 'react';

const IconAngleDown = ({ color, strokeWidth }) => {
  color = color || '#fff';
  strokeWidth = strokeWidth || '2';

  return (
    <svg className="icon-angle-down" width="18" height="18" viewBox="0 0 18 18">
        <polyline className="icon-angle-down-path" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" points="0,5.5 9,14.5 18,5.5 "/>
    </svg>
  );

};

export default IconAngleDown;
