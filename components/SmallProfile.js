import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const SmallProfile = ({ uri, onPress, fullVisible }) => {
  return (
    <>
      {uri ? (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.circleContainer}>
            <Image
              style={{
                width: 56,
                height: 56,
                resizeMode: "cover",
                borderWidth: 0,
                borderRadius: 28,
              }}
              source={{ uri: uri }}
            />
            {!fullVisible && (
              <BlurView intensity={10} style={styles.blurContainer}></BlurView>
            )}
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.circle}>
            <Feather name="user" size={30} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  circleContainer: {
    width: 56,
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    overflow: "hidden",
  },
  circle: {
    width: 56,
    height: 56,
    backgroundColor: colors.purple,
    borderRadius: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  blurContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    position: "absolute",
  },
});
export default SmallProfile;
