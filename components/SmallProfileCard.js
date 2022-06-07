import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SmallProfile from "./SmallProfile";
import colors from "../lib/colors.json";
import TinyProfile from "./TinyProfile";

const SmallProfileCard = ({ photoUrl, nickname, fullVisible, onPress }) => {
  const [blurNickname, setBlurNickname] = useState("");
  useEffect(() => {
    if (nickname?.slice !== undefined) {
      setBlurNickname(nickname?.slice(0, 1));
      for (let i = 0; i < nickname?.length - 1; i++) {
        setBlurNickname((prev) => prev + "*");
      }
    }
  }, [nickname]);
  return (
    <View style={styles.container}>
      <TinyProfile uri={photoUrl} fullVisible={fullVisible} onPress={onPress} />
      <View style={styles.info}>
        <View style={styles.top}>
          <Text style={styles.nickname}>
            {fullVisible ? nickname : blurNickname}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SmallProfileCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nickname: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.darkgray,
  },
  age: {
    color: colors.darkgray,
  },
  hashText: {
    fontSize: 16,
    color: colors.pink,
    fontWeight: "700",
    margin: 2,
  },
});
