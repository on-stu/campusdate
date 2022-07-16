import React, { FC } from "react";
import { View, Image, StyleSheet } from "react-native";
import colors from "../lib/colors.json";

type BigProfileType = {
  uri: string;
  fullVisible: boolean;
};

const BigProfile: FC<BigProfileType> = ({ uri, fullVisible }) => {
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
          blurRadius={!fullVisible ? 20 : 0}
        />
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
