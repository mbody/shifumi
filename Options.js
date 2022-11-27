import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import Option from "./Option";

export default class Options extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentOption: null,
    };
  }

  options = ["Pierre", "Feuille", "Ciseaux"];

  render() {
    const { currentOption } = this.state;
    return (
      <View style={styles.row}>
        {this.options.map((item, index) => (
          <Option
            key={"opt-" + index}
            selected={currentOption == item}
            label={item}
            onPress={() => this.setState({ currentOption: item })}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  inactive: {
    color: "green",
  },
  active: {
    color: "red",
  },
});
