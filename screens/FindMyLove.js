import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../lib/colors.json";
import ProfileCard from "../components/ProfileCard";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import key from "../lib/key.json";
import { getValue } from "../functions/secureStore";
import { UserContext } from "../context/user";

const FindMyLove = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const token = await getValue("token");
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${key.API}/usersbysex/`, { headers });

      if (
        userList.map((user) => user.id === response.data.id && response.data.id)
          .length === 0
      ) {
        setUserList((prev) => [...prev, ...response.data]);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Text style={styles.title}>내 연인 찾기</Text>
        </View>
        <View style={styles.inner}>
          <View style={styles.askContainer}>
            <Text style={styles.ask}>
              캠퍼스 데이트에 가입된{" "}
              {userInfo?.sex === "male" ? "여성" : "남성"}
              분들입니다.
            </Text>
            <Text style={styles.ask}>
              프로필을 확인하시고 먼저 연락을 걸어보세요!
            </Text>
          </View>
          {userList?.map((user, i) => {
            return (
              <View style={styles.profileContainer} key={i}>
                <ProfileCard
                  nickname={user?.nickname}
                  photoUrl={user?.photoUrl}
                  info={user?.whoAmI}
                  birthday={user?.birthday}
                  onButtonPress={() =>
                    navigation.navigate("Profile", {
                      userId: user?.id,
                    })
                  }
                />
              </View>
            );
          })}
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
    justifyContent: "flex-start",
    paddingHorizontal: 20,
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
    alignSelf: "center",
  },
  askContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    width: "100%",
    padding: 4,
    marginVertical: 4,
  },
});
