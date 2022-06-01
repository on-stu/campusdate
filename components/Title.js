import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";

const Title = ({ text, percent, backbutton, navigation }) => {
  return (
    <View style={styles.container}>
      {backbutton && (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather name="chevron-left" size={24} color={colors.darkgray} />
        </TouchableOpacity>
      )}
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
    flexDirection: "row",
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
