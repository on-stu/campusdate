import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MatchingIcon from "../../img/love.svg";
import ProgressBar from "../../components/ProgressBar";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";

const MatchingLoading = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const percentTimer = setInterval(() => setPercent((prev) => prev + 1), 100);
    if (percent === 100) {
      clearInterval(percentTimer);
    }
    return () => {
      clearInterval(percentTimer);
    };
  }, [percent]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>매칭하기</Text>
      </View>
      <MatchingIcon width={300} height={300} />
      <View style={styles.textContainer}>
        <Text
          style={styles.text}
        >{`${userInfo?.nickname}님과 맞는 인연을 찾아보고 있어요!`}</Text>
        <Text style={styles.text}>잠시만 기다려주세요 ~</Text>
      </View>
      <View style={styles.loading}>
        <Text style={styles.percentNum}>{percent}%</Text>
        <ProgressBar percent={percent} />
      </View>
      <BackButton text="취소하기" onPress={() => navigation.pop()} />
    </SafeAreaView>
  );
};

export default MatchingLoading;

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
    fontSize: 20,
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
});
