import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Option = ({ selected, label, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={{ padding: 10, color: selected ? "red" : "green" }}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default Option;
