import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MatchingIcon from "../../img/love.svg";
import ProgressBar from "../../components/ProgressBar";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";
import key from "../../lib/key.json";
import { UserContext } from "../../context/user";
import { getValue } from "../../functions/secureStore";
import axios from "axios";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
const MatchingLoading = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);

  const [percent, setPercent] = useState(0);
  const [matchedUser, setMatchedUser] = useState({});

  useEffect(() => {
    (async () => {
      const token = await getValue("token");
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${key.API}/usersbysex/`, { headers });

      if (response.data.length > 0) {
        setMatchedUser(response.data[0]);
      } else {
        setMatchedUser(false);
      }
    })();
  }, []);

  useEffect(() => {
    const percentTimer = setInterval(() => setPercent((prev) => prev + 1), 10);
    if (percent === 100 && matchedUser) {
      clearInterval(percentTimer);
      navigation.reset({
        routes: [
          { name: "BottomTab" },
          {
            name: "MatchingSuccess",
            params: {
              matchedUser,
            },
          },
        ],
      });
    } else if (percent === 100) {
      clearInterval(percentTimer);
      navigation.reset({
        routes: [
          { name: "BottomTab" },
          {
            name: "MatchingFailed",
          },
        ],
      });
    }
    return () => {
      clearInterval(percentTimer);
    };
  }, [percent]);
  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>????????????</Text>
        </View>
        <MatchingIcon width={300} height={300} />
        <View style={styles.textContainer}>
          <Text
            style={styles.text}
          >{`${userInfo?.nickname}?????? ?????? ????????? ???????????? ?????????!`}</Text>
          <Text style={styles.text}>????????? ?????????????????? ~</Text>
        </View>
        <View style={styles.loading}>
          <Text style={styles.percentNum}>{percent}%</Text>
          <ProgressBar percent={percent} />
        </View>
        <BackButton text="????????????" onPress={() => navigation.pop()} />
      </View>
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
});
