import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../lib/colors.json";
import BigProfile from "../components/BigProfile";
import Button from "../components/Button";
import { getValue } from "../functions/secureStore";
import axios from "axios";
import key from "../lib/key.json";
import { getBlurNickname } from "../functions/getBlurNickname";
import SocketContext from "../context/socket";
import { UserContext } from "../context/user";
import { getAge } from "../functions/getAge";
import SafeAreaAndroid from "../components/SafeAreaAndroid";
import Title from "../components/Title";

const EachBox = ({ title, tagsArray }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={{ width: "100%" }}>
        <View>
          <Text style={styles.blackText}>{title}</Text>
        </View>
        <View style={styles.hashContainer}>
          {tagsArray?.map((tag, i) => {
            if (i === tagsArray?.length - 1) {
              return (
                <Text style={styles.blackHashText} key={i}>
                  {tag}
                </Text>
              );
            } else {
              return (
                <Text style={styles.hashText} key={i}>
                  {tag}
                </Text>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
};

const Profile = ({ navigation, route }) => {
  const {
    params: { userId, preventChat, preventFullVisible },
  } = route;
  const [profileInfo, setProfileInfo] = useState({});
  const [whoAmIHash, setWhoAmIHash] = useState([]);
  const [idealsHash, setIdealsHash] = useState([]);
  const [hobbiesHash, setHobbiesHash] = useState([]);
  const [fullVisible, setFullVisible] = useState(false);
  const [blurNickname, setBlurNickname] = useState("");
  const socket = useContext(SocketContext);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    if (profileInfo.nickname !== undefined) {
      setBlurNickname(getBlurNickname(profileInfo.nickname));
    }
  }, [profileInfo.nickname]);

  const getProfile = async () => {
    const token = await getValue("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.get(`${key.API}/user/${userId}/`, {
      headers,
    });
    setProfileInfo(response.data);
  };

  useEffect(() => {
    if (profileInfo?.id === undefined) {
      getProfile();
    }
    if (profileInfo.id !== undefined && profileInfo !== {}) {
      const mySex = profileInfo?.sex === "male" ? "??????" : "??????";
      const otherSex = profileInfo?.sex === "male" ? "??????" : "??????";
      setWhoAmIHash(profileInfo?.whoAmI?.map((item, i) => `#${item}`));
      setWhoAmIHash((prev) => [...prev, `${mySex}??????.`]);
      setIdealsHash(profileInfo?.myIdeals?.map((item, i) => `#${item}`));
      setIdealsHash((prev) => [...prev, `${otherSex}??????.`]);
      setHobbiesHash(profileInfo?.myHobbies?.map((item, i) => `#${item}`));
      setHobbiesHash((prev) => [...prev, `??????.`]);
      if (userInfo.accepted.includes(profileInfo.id) && !preventFullVisible) {
        setFullVisible(true);
      }
    }
  }, [profileInfo]);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <Title
        text={`${
          fullVisible ? profileInfo?.nickname : blurNickname
        }?????? ?????????`}
        backbutton
        navigation={navigation}
      />
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.center}>
            <Text style={styles.title}>{}</Text>
          </View>
          <View style={styles.center}>
            <BigProfile uri={profileInfo?.photoUrl} fullVisible={fullVisible} />
          </View>
          <View style={{ ...styles.center, marginVertical: 20 }}>
            <Text style={styles.property}>{`${getAge(
              profileInfo?.birthday
            )}???`}</Text>
          </View>
          <EachBox
            title={fullVisible ? profileInfo?.nickname : blurNickname + "??????"}
            tagsArray={whoAmIHash}
          />
          <EachBox
            title={
              fullVisible
                ? profileInfo?.nickname
                : blurNickname + "?????? ????????????"
            }
            tagsArray={idealsHash}
          />
          <EachBox
            title={
              fullVisible ? profileInfo?.nickname : blurNickname + "?????? ?????????"
            }
            tagsArray={hobbiesHash}
          />
          <View style={styles.boxContainer}>
            <View>
              <Text style={styles.blackHashText}>{`${
                fullVisible ? profileInfo?.nickname : blurNickname
              }?????? ????????????`}</Text>
              <View style={styles.introduction}>
                <Text>{profileInfo?.introduction}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {!preventChat && (
        <View
          style={{
            ...styles.center,
            flexDirection: "column",
            marginBottom: 16,
          }}
        >
          <Button
            text="?????? ?????????"
            onPress={() => {
              socket.emit(
                "createRoom",
                userInfo?.id,
                profileInfo?.id,
                (chat) => {
                  navigation.reset({
                    routes: [
                      { name: "BottomTab" },
                      {
                        name: "ChatScreen",
                        params: {
                          id: chat.id,
                        },
                      },
                    ],
                  });
                }
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width,
  },
  inner: {
    flex: 1,
    padding: 20,
    width: Dimensions.get("screen").width,
  },
  center: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    color: colors.darkgray,
  },
  property: {
    fontSize: 16,
    color: colors.darkgray,
    fontWeight: "700",
  },
  blackText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
  },
  blackHashText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    margin: 2,
  },
  hashText: {
    fontSize: 16,
    color: colors.pink,
    fontWeight: "700",
    margin: 2,
  },
  boxContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  hashContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "100%",
  },
  introduction: {
    padding: 4,
  },
  headerContainer: {
    paddingHorizontal: 10,
  },
});
