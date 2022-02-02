import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Keyboard,
  Dimensions,
  Alert,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts, Comforter_400Regular } from "@expo-google-fonts/comforter";

import { commonColors } from "./src/utils/Colors";
import { Tasks } from "./src/components/tasksContainer";
import AppLoading from "expo-app-loading";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let [fontloader] = useFonts({
    Comforter_400Regular,
  });

  useEffect(() => {
    loadState();
  }, []);

  useEffect(() => {
    saveState();
  }, [taskItems]);

  const handledTask = () => {
    Keyboard.dismiss();
    if (task) {
      setTaskItems([...taskItems, task]);
      setTask(null);
    } else createButtonAlert();
  };

  const completTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = null;
    setTaskItems(itemsCopy);
  };

  const saveState = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(taskItems));
    } catch (e) {
      console.log(e);
    }
  };

  const loadState = async () => {
    try {
      const history = await AsyncStorage.getItem("tasks");
      if (history && JSON.parse(history).length) {
        setTaskItems(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createButtonAlert = () =>
    Alert.alert("Error", "Please enter a task", [
      { text: "OK", onPress: () => null },
    ]);

  const createButtonAlertForCompleteTasks = (index, isSelected) =>
    isSelected
      ? completTask(index)
      : Alert.alert("Warning", "Do you want to remove this task ? ", [
          { text: "OK", onPress: () => completTask(index) },
          { text: "Cancel", onPress: () => null },
        ]);

  if (!fontloader) {
    return <AppLoading />;
  } else {
    return (
      <>
        <View style={styles.titleContainer}>
          <Text style={styles.titleStyle}>Today's tasks</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.bodyContainer}>
            {!taskItems.length ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.simpleText}>Nothing yet :D </Text>
              </View>
            ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                {taskItems.map((item, index) => {
                  if (item == null) return;
                  return (
                    <Tasks
                      text={item}
                      key={index}
                      onPressOnCicular={(isSelected) =>
                        createButtonAlertForCompleteTasks(index, isSelected)
                      }
                    />
                  );
                })}
              </ScrollView>
            )}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Write a task"
              keyboardAppearance="dark"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handledTask()}
            >
              <Text style={styles.textUnderButton}>+</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6eced",
    justifyContent: "flex-start",
  },
  titleContainer: {
    height: windowHeight * 0.12,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#bbeefa",
  },
  titleStyle: {
    fontSize: 30,
    fontFamily: "Comforter_400Regular",
    marginBottom: 10,
  },
  simpleText: {
    fontSize: 15,
    fontStyle: "italic",
    fontWeight: "600",
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
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
