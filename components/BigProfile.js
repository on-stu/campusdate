import React from "react";
import { View, Image } from "react-native";

const BigProfile = ({ uri }) => {
  return (
    <View>
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
      />
    </View>
  );
};

export default BigProfile;
