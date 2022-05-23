import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import { FontAwesome } from "@expo/vector-icons";

const Option = ({ isChecked, onPress, text }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <FontAwesome name="times" size={24} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.pink,
    padding: 8,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 10,
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
