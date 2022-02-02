import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { commonColors } from "../utils/Colors";

export const Tasks = (props) => {
  const [isSelected, setIsSelected] = useState();

  return (
    <View style={styles.globalView}>
      {isSelected ? (
        <Ionicons
          name="checkmark-done"
          size={24}
          color="#32cd32"
          onPress={() => {
            setIsSelected(false);
          }}
        />
      ) : (
        <MaterialIcons
          name="remove-done"
          size={24}
          color={commonColors.Red}
          onPress={() => {
            setIsSelected(true);
          }}
        />
      )}
      <Text style={styles.taskName}>{props.text}</Text>
      <Entypo.Button
        name="trash"
        size={20}
        color="#dc143C"
        backgroundColor={"white"}
        iconStyle={{ marginRight: 0 }}
        onPress={() => {
          props.onPressOnCicular(isSelected);
        }}
      >
        Delete
      </Entypo.Button>
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
  taskName: {
    flex: 0.9,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
    maxWidth: "90%",
    flexWrap: "wrap",
  },
});
