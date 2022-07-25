import { StyleSheet, Platform, StatusBar, useColorScheme } from "react-native";

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    position: "relative",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
