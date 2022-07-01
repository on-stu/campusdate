import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import colors from "../lib/colors.json";

type backButtonPropTypes = {
  text: string;
  onPress: () => {};
};

const BackButton: FC<backButtonPropTypes> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    margin: 2,
  },
  button: {
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  text: { color: colors.darkgray, fontWeight: "700", fontSize: 20 },
});
