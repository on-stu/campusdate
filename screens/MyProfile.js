import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import colors from "../lib/colors.json";
import BigProfile from "../components/BigProfile";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

const EachBox = ({ title, tagsArray }) => {
  return (
    <View style={styles.boxContainer}>
      <View style={{ width: "80%" }}>
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
      <TouchableOpacity>
        <Feather name="edit-2" size={24} color={colors.pink} />
      </TouchableOpacity>
    </View>
  );
};

const MyProfile = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);
  const [whoAmIHash, setWhoAmIHash] = useState([]);
  const [idealsHash, setIdealsHash] = useState([]);
  const [hobbiesHash, setHobbiesHash] = useState([]);

  useEffect(() => {
    const mySex = userInfo.sex === "male" ? "남자" : "여자";
    const otherSex = userInfo.sex === "male" ? "여자" : "남자";
    if (userInfo) {
      setWhoAmIHash(userInfo.whoAmI?.map((item, i) => `#${item}`));
      setWhoAmIHash((prev) => [...prev, `${mySex}에요.`]);

      setIdealsHash(userInfo.myIdeals?.map((item, i) => `#${item}`));
      setIdealsHash((prev) => [...prev, `${otherSex}에요.`]);

      setHobbiesHash(userInfo.myHobbies?.map((item, i) => `#${item}`));
      setHobbiesHash((prev) => [...prev, `에요.`]);
    }
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <View style={styles.center}>
            <Text style={styles.title}>{userInfo?.nickname}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.text}>{`${userInfo?.age}세`}</Text>
          </View>
          <View style={styles.center}>
            <BigProfile uri={userInfo?.photoUrl} />
          </View>
          <TouchableOpacity>
            <View style={styles.left}>
              <Text style={styles.property}>이름 변경하기</Text>
              <Feather name="chevron-right" size={24} color={colors.darkgray} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.left}>
              <Text style={styles.property}>비밀번호 변경하기</Text>
              <Feather name="chevron-right" size={24} color={colors.darkgray} />
            </View>
          </TouchableOpacity>
          <EachBox title={userInfo?.nickname + "님은"} tagsArray={whoAmIHash} />
          <EachBox
            title={userInfo?.nickname + "님의 이상형은"}
            tagsArray={idealsHash}
          />
          <EachBox
            title={userInfo?.nickname + "님의 취미는"}
            tagsArray={hobbiesHash}
          />
          <View style={styles.boxContainer}>
            <View>
              <Text
                style={styles.blackHashText}
              >{`${userInfo?.nickname}님의 자기소개`}</Text>
              <Text>{userInfo?.introduction}</Text>
            </View>
            <TouchableOpacity>
              <Feather name="edit-2" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          ...styles.center,
          flexDirection: "column",
          borderTopWidth: 1,
          borderTopColor: colors.gray,
        }}
      >
        <Button text="적용하기" />
        <BackButton text="뒤로가기" onPress={() => navigation.pop()} />
      </View>
    </SafeAreaView>
  );
};

export default MyProfile;

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
});
