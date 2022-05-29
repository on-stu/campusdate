import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../lib/colors.json";

const NotificationCircle = ({ num }) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.text}>{num}</Text>
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
