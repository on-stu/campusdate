import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import MatchingIcon from "../../img/sad.svg";
import colors from "../../lib/colors.json";
import Button from "../../components/Button";
import BackButton from "../../components/BackButton";

const MatchingFailed = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>매칭실패</Text>
      </View>
      <MatchingIcon width={300} height={300} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>매칭에 실패하였습니다! ㅜㅜ</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>현재 서비스 이용 고객이 많지 않습니다.</Text>
        <Text style={styles.text}>대신 아래 매칭 기다리기를 누르시면,</Text>
        <Text style={styles.text}>
          {userInfo?.nickname}님과 맞는 분을 찾는 대로
        </Text>
        <Text style={styles.text}>알림을 보내드릴게요</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="매칭 수락하기" onPress={() => navigation.pop()} />
        <BackButton text="취소" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
};

export default MatchingFailed;

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
