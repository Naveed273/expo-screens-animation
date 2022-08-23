import React from "react";
import Svg, { Circle, Path } from "react-native-svg";
export default function EditableSvg() {
  return (
    <Svg
      //viewBox prop must be added to increase or decrease the size
      viewBox="0 0 24 24"
      width={300}
      height={300}
      fill="none"
      stroke="blue"
      // strokeWidth={2}
      fillRule={"evenodd"}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-award"
    >
      <Circle cx={12} cy={8} r={7} />
      <Path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </Svg>
  );
}
