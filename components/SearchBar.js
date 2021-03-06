import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";

const SearchBar = ({ placeholder, value, onChangeText, onSubmit }) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        autoFocus
      />
      <TouchableOpacity onPress={onSubmit} style={styles.searchIconContainer}>
        <View>
          <Feather name="search" size={24} color={colors.darkgray} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginVertical: 10,
    height: 40,
    width: "100%",
    position: "relative",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.darkgray,
    borderRadius: 10,
  },
  searchIconContainer: {
    position: "absolute",
    height: 40,
    justifyContent: "center",
    right: 4,
    padding: 4,
  },
});
