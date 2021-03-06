import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../lib/colors.json";
import ProfileCard from "../components/ProfileCard";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import key from "../lib/key.json";
import { getValue } from "../functions/secureStore";
import { UserContext } from "../context/user";
import { Feather } from "@expo/vector-icons";
import SafeAreaAndroid from "../components/SafeAreaAndroid";

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
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <View style={styles.top}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={24} color={colors.darkgray} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>내 연인 찾기</Text>
      </View>
      <ScrollView>
        <View style={styles.inner}>
          {userList.length > 0 ? (
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
          ) : (
            <View style={styles.askContainer}>
              <Text style={styles.ask}>
                현재 캠퍼스 데이트에 가입된{" "}
                {userInfo?.sex === "male" ? "여성" : "남성"}
                분들이 없거나,
              </Text>
              <Text style={styles.ask}>이미 연락중입니다.</Text>
              <Text style={styles.ask}>나중에 다시 시도해주세요.</Text>
            </View>
          )}
          {userList?.map((data, i) => {
            const user = data.data;
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
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    textAlign: "center",
  },
  askContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    width: "100%",
    padding: 4,
    marginVertical: 4,
  },
  buttonContainer: {
    position: "absolute",
    left: 10,
  },
});
