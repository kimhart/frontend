import React from 'react';

const IconTriangleDown = ({ fill, height, width }) => {
  fill = fill || 'white';
  width = width || '10px';
  height = height || '6px';
  return (
    <svg className="icon-triangle-down" width={width} height={height} viewBox="47 12 10 6">
        <path stroke="none" fill={fill} fill-rule="evenodd" d="M47.09375,12.78125 C47.0312497,12.7187497 47,12.6250006 47,12.5 C47,12.3541659 47.0520828,12.2343755 47.15625,12.140625 C47.2604172,12.0468745 47.3854159,12 47.53125,12 L56.46875,12 C56.6145841,12 56.7395828,12.0468745 56.84375,12.140625 C56.9479172,12.2343755 57,12.3541659 57,12.5 C57,12.6041672 56.9687503,12.6874997 56.90625,12.75 L56.84375,12.84375 L52.59375,17.71875 C52.4062491,17.9062509 52.2083344,18 52,18 C51.7916656,18 51.5937509,17.9062509 51.40625,17.71875 L47.15625,12.84375 L47.09375,12.78125 Z"></path>
    </svg>
  );

};

export default IconTriangleDown;
