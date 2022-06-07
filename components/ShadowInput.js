import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native";

const ShadowInput = ({
  placeholder,
  onChangeText,
  value,
  secure,
  email,
  num,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        keyboardType={email ? "email-address" : num && "numeric"}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secure}
        autoCapitalize="none"
        autoComplete="off"
      />
    </View>
  );
};

export default ShadowInput;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textInput: {
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
});
