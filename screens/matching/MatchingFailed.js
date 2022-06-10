import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import MatchingIcon from "../../img/sad.svg";
import colors from "../../lib/colors.json";
import Button from "../../components/Button";

import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const MatchingFailed = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        ...SafeAreaAndroid.AndroidSafeArea,
        alignItems: "center",
        width: Dimensions.get("screen").width,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>매칭실패</Text>
      </View>
      <MatchingIcon width={300} height={300} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>매칭에 실패하였습니다! ㅜㅜ</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>현재 서비스 이용 고객이 많지 않거나,</Text>
        <Text style={styles.text}>
          이미 매칭이 이루어졌던 분들 밖에 남지 않았어요.
        </Text>
        <Text style={styles.text}>다음에 다시 시도해주세요!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="다음에 시도하기" onPress={() => navigation.pop()} />
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
    marginTop: 20,
  },
});
