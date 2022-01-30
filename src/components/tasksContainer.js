import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

import { commonColors } from "../utils/Colors";

export const Tasks = (props) => {
  return (
    <View style={styles.globalView}>
      <View style={styles.shape} />
      <Text style={styles.taskName}>{props.text}</Text>
      <View style={styles.circular} />
    </View>
  );
};

const styles = StyleSheet.create({
  globalView: {
    backgroundColor: commonColors.White,
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  shape: {
    borderRadius: 5,
    backgroundColor: '#4fdeff',
    height: 24,
    width: 24,
    opacity: 0.3,
  },
  taskName: {
    fontStyle: "italic",
    fontWeight: "bold",
    fontSize: 15,
    maxWidth: "80%",
    flexWrap: "wrap",
  },
  circular: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#4fdeff',
  },
});
