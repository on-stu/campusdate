import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import SmallProfile from "./SmallProfile";
import colors from "../lib/colors.json";

const ProfileCard = ({
  photoUrl,
  nickname,
  age,
  info,
  onButtonPress,
  fullVisible,
}) => {
  const [blurNickname, setBlurNickname] = useState("");
  useEffect(() => {
    setBlurNickname(nickname?.slice(0, 1));
    for (let i = 0; i < nickname?.length - 1; i++) {
      setBlurNickname((prev) => prev + "*");
    }
  }, [nickname]);
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <SmallProfile uri={photoUrl} />
        <View style={styles.info}>
          <View style={styles.top}>
            <Text style={styles.nickname}>
              {fullVisible ? nickname : blurNickname}
            </Text>
            <Text style={styles.age}>{age + "세"}</Text>
          </View>
          <View style={styles.infoContainer}>
            {info?.map((hash, i) => {
              if (i < 3) {
                return (
                  <Text style={styles.hashText} key={i}>
                    {"#" + hash}
                  </Text>
                );
              }
            })}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onButtonPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>프로필 보기</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.pink,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
  },
  info: {
    marginLeft: 10,
  },
  top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 4,
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
