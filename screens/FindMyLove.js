import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import colors from "../lib/colors.json";
import ProfileCard from "../components/ProfileCard";
import { ScrollView } from "react-native-gesture-handler";

const exampleUser = {
  nickname: "유승호",
  age: 23,
  whoAmI: ["귀여운", "청순한"],
};

const FindMyLove = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.title}>내 연인 찾기</Text>
        </View>
        <View style={styles.inner}>
          <Text style={styles.ask}>
            캠퍼스 데이트에 가입된 {userInfo?.sex === "male" ? "여성" : "남성"}
            분들입니다.
          </Text>
          <Text style={styles.ask}>
            프로필을 확인하시고 먼저 연락을 걸어보세요!
          </Text>
          <View style={styles.profileContainer}>
            <ProfileCard
              nickname={exampleUser.nickname}
              age={exampleUser.age}
              info={exampleUser.whoAmI}
              onButtonPress={() =>
                navigation.navigate("Profile", {
                  names: ["Brent", "Satya", "Michaś"],
                })
              }
            />
          </View>
          <View style={styles.profileContainer}>
            <ProfileCard
              nickname={exampleUser.nickname}
              age={exampleUser.age}
              info={exampleUser.whoAmI}
              fullVisible
            />
          </View>
          <View style={styles.profileContainer}>
            <ProfileCard
              nickname={exampleUser.nickname}
              age={exampleUser.age}
              info={exampleUser.whoAmI}
            />
          </View>
          <View style={styles.profileContainer}>
            <ProfileCard
              nickname={exampleUser.nickname}
              age={exampleUser.age}
              info={exampleUser.whoAmI}
            />
          </View>
          <View style={styles.profileContainer}>
            <ProfileCard
              nickname={exampleUser.nickname}
              age={exampleUser.age}
              info={exampleUser.whoAmI}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindMyLove;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  inner: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  ask: {
    fontSize: 16,
    color: colors.pink,
  },
  profileContainer: {
    width: "100%",
    padding: 4,
    marginVertical: 4,
  },
});
