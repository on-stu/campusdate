import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const Title = ({ text, percent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{text}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.percent}>{percent}</Text>
      </View>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    display: "flex",
    paddingLeft: 20,
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  percent: {
    fontWeight: "700",
  },
});
