import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";

const TinyProfile = ({ uri, onPress }) => {
  return (
    <>
      {uri ? (
        <TouchableOpacity onPress={onPress}>
          <View>
            <Image
              style={{
                width: 32,
                height: 32,
                resizeMode: "cover",
                borderWidth: 0,
                borderRadius: 28,
              }}
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
});
export default TinyProfile;
