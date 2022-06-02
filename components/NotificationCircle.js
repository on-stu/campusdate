import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../lib/colors.json";

const NotificationCircle = ({ num }) => {
  return (
    <View
      style={
        num > 0
          ? styles.circle
          : { ...styles.circle, backgroundColor: "transparent" }
      }
    >
      <Text style={styles.text}>{num > 0 && num}</Text>
    </View>
  );
};

export default NotificationCircle;

const styles = StyleSheet.create({
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.red,
  },
  text: {
    color: "#fff",
  },
});
