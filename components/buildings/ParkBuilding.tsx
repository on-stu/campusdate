import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Park from "../../assets/home/park.png";
import React from "react";

const ParkBuilding = () => {
  const aspectRatio = 813 / 390;
  const width = Dimensions.get("screen").width;
  const marginAspectRatio = -271 / 390;

  return (
    <Image
      source={Park}
      style={{
        width: width,
        height: width * aspectRatio,
        marginTop: width * marginAspectRatio,
      }}
      resizeMode="contain"
    />
  );
};

export default ParkBuilding;

const styles = StyleSheet.create({});
