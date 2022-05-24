import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";

const SmallProfile = ({ uri, onPress }) => {
  return (
    <>
      {uri ? (
        <TouchableOpacity>
          <View>
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
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <View style={styles.circle}>
            <Feather name="user" size={30} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 56,
    height: 56,
    backgroundColor: colors.purple,
    borderRadius: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default SmallProfile;
