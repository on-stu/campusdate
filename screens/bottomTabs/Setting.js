import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import Hr from "../../components/Hr";
import colors from "../../lib/colors.json";
import MyProfileCard from "../../components/MyProfileCard";
import { deleteItem, getValue } from "../../functions/secureStore";
import { UserContext } from "../../context/user";
import SocketContext from "../../context/socket";
import axios from "axios";
import key from "../../lib/key.json";
import { useDispatch } from "react-redux";
import { initCharm } from "../../redux/reducers/charmSlice";
import { initCharms } from "../../redux/reducers/charmsSlice";
import { initEvent } from "../../redux/reducers/eventSlice";
import { initFaq } from "../../redux/reducers/faqSlice";
import { initFaqs } from "../../redux/reducers/faqsSlice";
import { initEvents } from "../../redux/reducers/eventsSlice";
import { initNotice } from "../../redux/reducers/noticeSlice";
import { initNotices } from "../../redux/reducers/noticesSlice";
import { initReview } from "../../redux/reducers/reviewSlice";
import { initReviews } from "../../redux/reducers/reviewsSlice";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const Setting = ({ stackNavigation }) => {
  const { userInfo, setUserInfo, setUserChatList } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [notification, setNotification] = useState(true);
  const dispatch = useDispatch();

  const deleteUser = async () => {
    try {
      const token = await getValue("token");
      console.log(token);
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.delete(`${key.API}/user/`, {
        headers,
      });
      if (response.status === 204) {
        setUserInfo({});
        socket.disconnect();
        stackNavigation.reset({
          routes: [{ name: "Login" }],
        });
        deleteItem("token");
      }
    } catch (error) {
      Alert.alert("??????", `????????? ?????? ????????? ??????????????????\n${error.message}`);
    }
  };

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>??????</Text>
        </View>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Text style={styles.property}>??????</Text>
          </View>
          <View style={styles.menu}>
            <MyProfileCard
              photoUrl={userInfo?.photoUrl}
              nickname={userInfo?.nickname}
              birthday={userInfo?.birthday}
              info={userInfo?.whoAmI}
              onButtonPress={() => stackNavigation.navigate("MyProfile")}
              fullVisible
            />
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>??? ??????</Text>
            <TouchableOpacity
              style={styles.menu}
              onPress={() => setNotification((prev) => !prev)}
            >
              <Text>?????? ??????</Text>
              <Text style={styles.value}>{notification ? "??????" : "??????"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menu}
              onPress={() =>
                Alert.alert(
                  "????????? ?????????????????????????",
                  "????????? ??????????????? ???????????? ?????????????????????.",
                  [
                    {
                      text: "???",
                      onPress: () => {
                        deleteItem("token").then(() => {
                          setUserInfo({});
                          setUserChatList([]);
                          dispatch(initCharm());
                          dispatch(initCharms());
                          dispatch(initEvent());
                          dispatch(initEvents());
                          dispatch(initNotice());
                          dispatch(initNotices());
                          dispatch(initFaq());
                          dispatch(initFaqs());
                          dispatch(initReview());
                          dispatch(initReviews());
                          socket.disconnect();
                          stackNavigation.reset({
                            routes: [{ name: "Login" }],
                          });
                        });
                      },
                    },
                    {
                      text: "?????????",
                    },
                  ]
                )
              }
            >
              <Text>?????? ??????</Text>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>????????????</Text>
            <TouchableOpacity style={styles.menu}>
              <Text>??? ??????</Text>
              <Text style={styles.value}>0.1.0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("Notice")}
              style={styles.menu}
            >
              <Text>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("Faq")}
              style={styles.menu}
            >
              <Text>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("ReportPost")}
              style={styles.menu}
            >
              <Text>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("ServiceTerms")}
              style={styles.menu}
            >
              <Text>????????? ????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("PrivacyTerms")}
              style={styles.menu}
            >
              <Text>???????????? ????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("OpenSourceList")}
              style={styles.menu}
            >
              <Text>???????????? ????????????</Text>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>??????</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("??????", "??????????????????.")}
              style={styles.menu}
            >
              <Text>?????? ??????</Text>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>??????</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("??????", "???????????? ???????????????????", [
                  {
                    text: "???",
                    onPress: () => {
                      deleteItem("token").then(() => {
                        setUserInfo({});
                        setUserChatList([]);
                        socket.disconnect();
                        stackNavigation.reset({
                          routes: [{ name: "Login" }],
                        });
                      });
                    },
                  },
                  {
                    text: "?????????",
                  },
                ])
              }
              style={styles.menu}
            >
              <Text>????????????</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "???????????? ???????????????????",
                  "??????????????? ????????? ???????????? ?????? ????????? ???????????? ????????????.",
                  [
                    {
                      text: "???",
                      onPress: deleteUser,
                    },
                    {
                      text: "?????????",
                    },
                  ]
                )
              }
              style={styles.menu}
            >
              <Text>?????? ??????</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: Dimensions.get("screen").width,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  center: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  left: {
    width: Dimensions.get("screen").width - 40,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  property: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "700",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  value: {
    color: colors.darkgray,
  },
});
