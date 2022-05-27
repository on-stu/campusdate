import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";

const MiniCheck = ({ text, isChecked, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {isChecked ? (
          <>
            <View style={styles.circle}>
              <Feather name="check" size={20} color="white" />
            </View>
            <Text style={styles.text}>{text}</Text>
          </>
        ) : (
          <>
            <View style={styles.circleDisabled}>
              <Feather name="check" size={20} color="white" />
            </View>
            <Text style={styles.textDisabled}>{text}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MiniCheck;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.pink,
    borderRadius: 12,
    width: 24,
    height: 24,
  },
  text: {
    marginLeft: 4,
    color: colors.pink,
  },
  circleDisabled: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkgray,
    borderRadius: 12,
    width: 24,
    height: 24,
  },
  textDisabled: {
    marginLeft: 4,
    color: colors.darkgray,
  },
});
