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

const Setting = ({ stackNavigation }) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [notification, setNotification] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>설정</Text>
        </View>
        <View style={styles.inner}>
          <View style={styles.left}>
            <Text style={styles.property}>계정</Text>
          </View>
          <View style={styles.menu}>
            <MyProfileCard
              photoUrl={userInfo?.photoUrl}
              nickname={userInfo?.nickname}
              age={userInfo?.age}
              info={userInfo?.whoAmI}
              onButtonPress={() => stackNavigation.navigate("MyProfile")}
              fullVisible
            />
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>앱 설정</Text>
            <TouchableOpacity onPress={() => setNotification((prev) => !prev)}>
              <View style={styles.menu}>
                <Text>알림 설정</Text>
                <Text style={styles.value}>
                  {notification ? "켜짐" : "꺼짐"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>캐시 삭제</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>이용안내</Text>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>앱 버전</Text>
                <Text style={styles.value}>0.1.0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => stackNavigation.navigate("Notice")}
            >
              <View style={styles.menu}>
                <Text>공지사항</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stackNavigation.navigate("Faq")}>
              <View style={styles.menu}>
                <Text>문의하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>신고하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>서비스 이용약관</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>개인정보 처리방침</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>오픈소스 라이선스</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>결제</Text>
            <TouchableOpacity
              onPress={() => Alert.alert("알림", "준비중입니다.")}
            >
              <View style={styles.menu}>
                <Text>결제 내역</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Hr />
          <View style={styles.left}>
            <Text style={styles.property}>기타</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert("알림", "로그아웃 하시겠습니까?", [
                  {
                    text: "예",
                    onPress: () => {
                      deleteItem("token").then(() => {
                        getValue("token").then((token) => {
                          setUserInfo({});
                          socket.disconnect();
                          stackNavigation.reset({
                            routes: [{ name: "Login" }],
                          });
                        });
                      });
                    },
                  },
                  {
                    text: "아니오",
                  },
                ])
              }
            >
              <View style={styles.menu}>
                <Text>로그아웃</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.menu}>
                <Text>회원 탈퇴</Text>
              </View>
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
    width: "100%",
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
