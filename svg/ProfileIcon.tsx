import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const ProfileIcon = () => {
  const colorMode = useColorScheme();
  const color = colorMode === "light" ? "#4A4A4A" : "#FFFFFF";
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M1 26C1 22.134 4.13401 19 8 19H22C25.866 19 29 22.134 29 26V29H1V26Z"
        stroke={color}
        strokeWidth="2"
      />
      <Circle cx="15" cy="8" r="7" stroke={color} strokeWidth="2" />
    </Svg>
  );
};

export default ProfileIcon;

const styles = StyleSheet.create({});
