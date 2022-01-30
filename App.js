import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native";

import { commonColors } from "./src/utils/Colors";
import { Tasks } from "./src/components/tasksContainer";

export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>Today's tasks</Text>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView>
          <Tasks
            text={"task number 1task number 1task number 1task number 1"}
          />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
          <Tasks text={"task number 2"} />
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Write a task"
          keyboardAppearance="dark"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textUnderButton}>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6eced",
    justifyContent: "flex-start",
  },
  titleContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#bbeefa",
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bodyContainer: {
    flex: 1,
  },
  inputContainer: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#e6eced",
  },
  textInput: {
    flex: 0.9,
    borderColor: "#c3c8c9",
    borderRadius: 50,
    height: 50,
    borderWidth: 3,
    backgroundColor: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: commonColors.White,
    borderColor: "#c3c8c9",
    borderRadius: 25,
    borderWidth: 3,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  textUnderButton: {
    fontSize: 20,
    color: "#c3c8c9",
    textAlign: "center",
  },
});
