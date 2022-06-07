import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import NotificationCircle from "./NotificationCircle";

const BottomTabIcon = ({ focused, iconName, totalNotRead }) => {
  return (
    <>
      {iconName === "chat" && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <NotificationCircle num={totalNotRead} />
          </View>
          <Feather
            name="message-circle"
            size={24}
            color={focused ? "white" : colors.darkgray}
          />
        </View>
      )}
    </>
  );
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    zIndex: 10,
    top: -4,
    left: -4,
  },
});
