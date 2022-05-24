import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";

const SelectButton = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
        <Feather name="chevron-down" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default SelectButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    backgroundColor: colors.gray,
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
  },
  text: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
});
