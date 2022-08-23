import React from "react";
import { View } from "react-native";
import EditableSvg from "../components/EditableSvg";

export default function SvgScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <EditableSvg />
    </View>
  );
}
