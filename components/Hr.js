import { StyleSheet, View, Text } from "react-native";
import React from "react";
import colors from "../lib/colors.json";

const Hr = () => {
  return (
    <View style={styles.line}>
      <View></View>
    </View>
  );
};

export default Hr;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    backgroundColor: colors.gray,
    padding: 0.5,
  },
});
