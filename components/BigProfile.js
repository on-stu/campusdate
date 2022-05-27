import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import colors from "../lib/colors.json";

const BigProfile = ({ uri, fullVisible }) => {
  // console.log(uri);
  return (
    <View style={styles.circleContainer}>
      {uri && (
        <Image
          style={{
            width: 250,
            height: 250,
            resizeMode: "cover",
            borderWidth: 0,
            borderRadius: 125,
            margin: 12,
          }}
          source={{ uri: uri }}
        />
      )}
      {!fullVisible && (
        <BlurView intensity={30} style={styles.blurContainer}></BlurView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  circleContainer: {
    width: 250,
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 125,
  },
  circle: {
    width: 250,
    height: 250,
    backgroundColor: colors.purple,
    borderRadius: 125,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    position: "absolute",
  },
});
export default BigProfile;
