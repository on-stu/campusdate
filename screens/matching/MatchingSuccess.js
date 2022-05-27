import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import MatchingIcon from "../../img/love2.svg";
import colors from "../../lib/colors.json";
import Button from "../../components/Button";
import ProfileCard from "../../components/ProfileCard";

const MatchingSuccess = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>매칭성공</Text>
      </View>
      <MatchingIcon width={300} height={300} />
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
        >{`${userInfo?.nickname}님과 맞는 인연을 찾았어요!`}</Text>
      </View>
      <View style={styles.profileContainer}>
        <ProfileCard nickname="손다인" age={22} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>아래 매칭 수락하기 버튼을 눌러서</Text>
        <Text style={styles.text}>그 분과 이야기 해보세요!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="매칭 수락하기" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
};

export default MatchingSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    padding: 20,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  textContainer: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "center",
  },
  loading: {
    width: "100%",
    padding: 30,
    display: "flex",
    alignItems: "center",
    marginVertical: 20,
  },
  percentNum: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    color: colors.pink,
  },
  profileContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
  },
});
