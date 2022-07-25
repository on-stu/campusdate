import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Cafe from "../../assets/home/cafeBuilding.png";

const CafeBuilding = () => {
  const aspectRatio = 813 / 390;
  const width = Dimensions.get("screen").width;
  const marginAspectRatio = -271 / 390;

  return (
    <Image
      source={Cafe}
      style={{
        width: width,
        height: width * aspectRatio,
        marginTop: width * marginAspectRatio,
      }}
      resizeMode="contain"
    />
  );
};

export default CafeBuilding;

const styles = StyleSheet.create({});
