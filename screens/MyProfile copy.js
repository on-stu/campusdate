import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import colors from "../lib/colors.json";
import BigProfile from "../components/BigProfile";

const MyProfile = () => {
  const userInfo = useSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.center}>
            <Text style={styles.title}>{userInfo?.nickname}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.text}>{`${userInfo?.age}세`}</Text>
          </View>
          <View style={styles.center}>
            <BigProfile uri={userInfo?.photoUrl} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  center: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    color: colors.darkgray,
  },
});
