import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import React, { Component } from "react";
import { Colors } from "../theme/Theme";

export default class Score extends Component {
  constructor() {
    super();
  }

  render() {
    const { playerScore, computerScore } = this.props;
    return (
      <View style={styles.scoreZone}>
        <Text style={[styles.score, { color: Colors.playerColor }]}>
          {playerScore}
        </Text>
        <Text style={[styles.score]}>-</Text>
        <Text style={[styles.score, { color: Colors.computerColor }]}>
          {computerScore}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreZone: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.veryLightGray,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  score: {
    fontSize: 45,
    fontWeight: "bold",
    padding: 5,
  },
});
