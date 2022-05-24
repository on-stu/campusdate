import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";

const Button = ({ onPress, disabled, text }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}
    >
      <View style={disabled ? styles.disabled : styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    backgroundColor: colors.pink,
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  disabled: {
    backgroundColor: colors.gray,
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: { color: "#ffffff", fontWeight: "700", fontSize: 20 },
});
