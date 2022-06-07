import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TinyProfile from "./TinyProfile";
import colors from "../lib/colors.json";

const YourChat = ({ photoUrl, text, fullVisible, onPress }) => {
  return (
    <View style={styles.container}>
      <TinyProfile uri={photoUrl} fullVisible={fullVisible} onPress={onPress} />
      <View style={styles.messageBox}>
        <Text style={styles.message}>{text}</Text>
      </View>
    </View>
  );
};

export default YourChat;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
  },
  messageBox: {
    backgroundColor: colors.gray,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  message: {
    color: "#000",
  },
});
