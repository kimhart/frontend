import React from 'react';

const IconPhone = ({ width, height, viewBox, stroke, fill }) => {
  stroke = 'none';
  fill = '#ED2332';
  width = '20px';
  height = '20px';
  viewBox= '55 276 20 20';
  return (
    <svg class="icon-phone" width={width} height={height} viewBox={viewBox}>
      <path class="icon-phone-path" stroke={stroke} fill={fill} d="M60.1171875,276.972656 C60.4817727,277.480471 60.8821593,278.059893 61.3183594,278.710938 C61.7545595,279.361982 62.22656,280.084631 62.734375,280.878906 C62.864584,281.087241 62.919922,281.321613 62.9003906,281.582031 C62.8808593,281.842449 62.7864592,282.122394 62.6171875,282.421875 C62.552083,282.552084 62.441407,282.760415 62.2851562,283.046875 C62.1289055,283.333335 61.9270846,283.704425 61.6796875,284.160156 C61.9531264,284.550783 62.3014302,284.986977 62.7246094,285.46875 C63.1477886,285.950523 63.6393201,286.471351 64.1992188,287.03125 C64.7721383,287.60417 65.2962216,288.102211 65.7714844,288.525391 C66.2467472,288.94857 66.6731752,289.296874 67.0507812,289.570312 C67.4934918,289.309895 67.8613267,289.098308 68.1542969,288.935547 C68.4472671,288.772786 68.6588535,288.658854 68.7890625,288.59375 C68.9453133,288.502604 69.1048169,288.434245 69.2675781,288.388672 C69.4303394,288.343099 69.5833326,288.320312 69.7265625,288.320312 C69.8437506,288.320312 69.9511714,288.333333 70.0488281,288.359375 C70.1464849,288.385417 70.240885,288.424479 70.3320312,288.476562 C70.9179717,288.828127 71.5364551,289.222003 72.1875,289.658203 C72.8385449,290.094403 73.5351525,290.572914 74.2773438,291.09375 C74.4075527,291.184896 74.5117184,291.302083 74.5898438,291.445312 C74.6679691,291.588542 74.720052,291.744791 74.7460938,291.914062 C74.7591146,292.096355 74.7395836,292.2819 74.6875,292.470703 C74.6354164,292.659506 74.5442715,292.851562 74.4140625,293.046875 C74.3619789,293.138021 74.2838547,293.248697 74.1796875,293.378906 C74.0755203,293.509115 73.9518236,293.658853 73.8085938,293.828125 C73.6783848,293.997397 73.5091156,294.189452 73.3007812,294.404297 C73.0924469,294.619142 72.8450535,294.85677 72.5585938,295.117188 C72.2851549,295.377605 72.0345063,295.572916 71.8066406,295.703125 C71.5787749,295.833334 71.3802092,295.898438 71.2109375,295.898438 L71.171875,295.898438 C70.4947883,295.872396 69.78516,295.725913 69.0429688,295.458984 C68.3007775,295.192056 67.5195354,294.8112 66.6992188,294.316406 C65.8789021,293.821612 65.0195357,293.203129 64.1210938,292.460938 C63.2226518,291.718746 62.2851611,290.86589 61.3085938,289.902344 C60.3320264,288.925776 59.4759151,287.988286 58.7402344,287.089844 C58.0045536,286.191402 57.3860702,285.332035 56.8847656,284.511719 C56.383461,283.691402 56.0026055,282.906905 55.7421875,282.158203 C55.4817695,281.409501 55.3385418,280.703128 55.3125,280.039062 C55.3125,279.85677 55.3776035,279.651694 55.5078125,279.423828 C55.6380215,279.195962 55.833332,278.938804 56.09375,278.652344 C56.354168,278.365884 56.5885406,278.121746 56.796875,277.919922 C57.0052094,277.718098 57.1940096,277.552084 57.3632812,277.421875 C57.519532,277.304687 57.6692701,277.194011 57.8125,277.089844 C57.9557299,276.985677 58.0794266,276.894532 58.1835938,276.816406 C58.3268236,276.712239 58.4765617,276.63737 58.6328125,276.591797 C58.7890633,276.546224 58.9583324,276.523438 59.140625,276.523438 C59.3489594,276.523438 59.5345044,276.559244 59.6972656,276.630859 C59.8600269,276.702474 59.9999994,276.816405 60.1171875,276.972656 Z M58.8671875,277.773438 C58.6067695,277.95573 58.3528658,278.154296 58.1054688,278.369141 C57.8580717,278.583985 57.6171887,278.808593 57.3828125,279.042969 C57.1484363,279.277345 56.9628913,279.479166 56.8261719,279.648438 C56.6894524,279.817709 56.6015627,279.960937 56.5625,280.078125 C56.5885418,280.664065 56.7252592,281.289059 56.9726562,281.953125 C57.2200533,282.617191 57.5781227,283.323564 58.046875,284.072266 C58.5156273,284.820967 59.0950486,285.60872 59.7851562,286.435547 C60.4752639,287.262374 61.2760371,288.131506 62.1875,289.042969 C63.0989629,289.954432 63.9680948,290.755205 64.7949219,291.445312 C65.6217489,292.13542 66.4095015,292.714841 67.1582031,293.183594 C67.9069048,293.652346 68.6165331,294.010415 69.2871094,294.257812 C69.9576856,294.50521 70.5859346,294.648437 71.171875,294.6875 C71.2630213,294.648437 71.3932283,294.557292 71.5625,294.414062 C71.7317717,294.270833 71.9335926,294.082032 72.1679688,293.847656 C72.4023449,293.61328 72.6236969,293.369142 72.8320312,293.115234 C73.0403656,292.861327 73.2421865,292.604168 73.4375,292.34375 C73.4765627,292.291666 73.5026041,292.242839 73.515625,292.197266 C73.5286459,292.151692 73.5286459,292.109375 73.515625,292.070312 C72.7604129,291.536456 72.0670604,291.0612 71.4355469,290.644531 C70.8040333,290.227863 70.2343775,289.856772 69.7265625,289.53125 C69.6744789,289.53125 69.6158857,289.541016 69.5507812,289.560547 C69.4856768,289.580078 69.4140629,289.609375 69.3359375,289.648438 C69.2317703,289.713542 69.0364598,289.824218 68.75,289.980469 C68.4635402,290.13672 68.0924502,290.33854 67.6367188,290.585938 L66.9921875,290.976562 L66.3476562,290.546875 C65.9309875,290.260415 65.4720077,289.89258 64.9707031,289.443359 C64.4693985,288.994138 63.9192738,288.470055 63.3203125,287.871094 C62.7343721,287.272132 62.2200543,286.722008 61.7773438,286.220703 C61.3346332,285.719399 60.9700535,285.260419 60.6835938,284.84375 L60.2148438,284.238281 L60.6054688,283.554688 C60.8528658,283.098956 61.0546867,282.731121 61.2109375,282.451172 C61.3671883,282.171223 61.4778643,281.972657 61.5429688,281.855469 C61.5820314,281.777343 61.611328,281.705729 61.6308594,281.640625 C61.6503907,281.575521 61.6601562,281.516927 61.6601562,281.464844 C61.2044248,280.748694 60.7714864,280.078128 60.3613281,279.453125 C59.9511698,278.828122 59.5572936,278.24219 59.1796875,277.695312 L59.140625,277.695312 C59.0885414,277.695312 59.0397138,277.701823 58.9941406,277.714844 C58.9485675,277.727865 58.9062502,277.747396 58.8671875,277.773438 Z"></path>
    </svg>
  );

};

export default IconPhone;
