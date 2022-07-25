import { Dimensions, Image, StyleSheet } from "react-native";
import React from "react";
import HuntBuilding from "../../assets/home/huntingBuilding.png";

const HuntingBuilding = () => {
  const aspectRatio = 813 / 390;
  const width = Dimensions.get("screen").width;

  return (
    <Image
      source={HuntBuilding}
      style={{
        width: width,
        height: width * aspectRatio,
      }}
      resizeMode="contain"
    />
  );
};

export default HuntingBuilding;

const styles = StyleSheet.create({});
