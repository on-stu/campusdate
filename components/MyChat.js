import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TinyProfile from "./TinyProfile";
import colors from "../lib/colors.json";

const MyChat = ({ text, isRead }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.readMessage}>{isRead ? "읽음" : "읽지 않음"}</Text>
      <View style={styles.messageBox}>
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  );
};

export default MyChat;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
    height: 50,
  },
  messageBox: {
    backgroundColor: colors.pink,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  message: {
    color: "#fff",
  },
  readMessage: {
    color: colors.darkgray,
    fontSize: 14,
    marginRight: 4,
  },
});
