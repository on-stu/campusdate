import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";

const TinyProfile = ({ uri, onPress, fullVisible }) => {
  // console.log(uri);
  return (
    <>
      {uri ? (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.circleContainer}>
            <Image
              style={{
                width: 32,
                height: 32,
                resizeMode: "cover",
                borderWidth: 0,
                borderRadius: 28,
                zIndex: 10,
              }}
              blurRadius={!fullVisible ? 10 : 0}
              source={{ uri: uri }}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.circle}>
            <Feather name="user" size={20} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    backgroundColor: colors.purple,
    borderRadius: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    overflow: "hidden",
  },
  blurContainer: {
    width: 32,
    height: 32,
    borderRadius: 28,
    position: "absolute",
    zIndex: 100,
  },
});
export default TinyProfile;
