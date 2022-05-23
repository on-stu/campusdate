import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";

const Check = ({ isChecked, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={isChecked ? styles.circle : styles.disabled}>
          <Feather name="check" size={20} color="white" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Check;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
  },
  circle: {
    width: 24,
    height: 24,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.pink,
  },
  disabled: {
    width: 24,
    height: 24,
    margin: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.gray,
  },
});
