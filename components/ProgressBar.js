import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../lib/colors.json";

const ProgressBar = ({ percent }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.bar, width: `${percent}%` }}></View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 16,
    backgroundColor: colors.gray,
    borderRadius: 8,
    position: "relative",
  },
  bar: {
    position: "absolute",
    height: 16,
    backgroundColor: colors.pink,
    borderRadius: 8,
  },
});
