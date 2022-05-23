import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";

const BackButton = ({ text }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: { color: colors.darkgray, fontWeight: "700", fontSize: 20 },
});
