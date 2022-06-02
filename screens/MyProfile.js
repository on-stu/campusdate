import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../lib/colors.json";
import BigProfile from "../components/BigProfile";
import { Feather } from "@expo/vector-icons";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import { getValue } from "../functions/secureStore";
import axios from "axios";
import key from "../lib/key.json";
import { UserContext } from "../context/user";
import { getAge } from "../functions/getAge";

const EachBox = ({ title, tagsArray, onPress }) => {
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
      <TouchableOpacity onPress={onPress}>
        <Feather name="edit-2" size={24} color={colors.pink} />
      </TouchableOpacity>
    </View>
  );
};

const MyProfile = ({ navigation }) => {
  const [whoAmIHash, setWhoAmIHash] = useState([]);
  const [idealsHash, setIdealsHash] = useState([]);
  const [hobbiesHash, setHobbiesHash] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("권한을 승인해주십시오.");
        }
      }
    })();
  }, []);

  const resizeImg = async (uri) => {
    try {
      const result = await manipulateAsync(
        uri,
        [
          {
            resize: {
              width: 500,
            },
          },
        ],
        {
          base64: true,
        }
      );
      return result.base64;
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.cancelled) {
      const resized = await resizeImg(result.uri);
      setPhotoUrl(`data:img/png;base64,${resized}`);
    }
  };

  useEffect(() => {
    if (userInfo) {
      const mySex = userInfo.sex === "male" ? "남자" : "여자";
      const otherSex = userInfo.sex === "male" ? "여자" : "남자";
      setWhoAmIHash(userInfo.whoAmI?.map((item, i) => `#${item}`));
      setWhoAmIHash((prev) => [...prev, `${mySex}에요.`]);

      setIdealsHash(userInfo.myIdeals?.map((item, i) => `#${item}`));
      setIdealsHash((prev) => [...prev, `${otherSex}에요.`]);

      setHobbiesHash(userInfo.myHobbies?.map((item, i) => `#${item}`));
      setHobbiesHash((prev) => [...prev, `에요.`]);

      setPhotoUrl(userInfo?.photoUrl.toString());
    }
  }, [userInfo]);

  const onSubmit = async () => {
    if (userInfo?.photoUrl !== photoUrl) {
      const token = await getValue("token");
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.put(
        `${key.API}/user/`,
        { photoUrl },
        {
          headers,
        }
      );
      setUserInfo(response.data);
      navigation.pop();
    } else {
      navigation.pop();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={24} color={colors.darkgray} />
          </TouchableOpacity>
        </View>
        <View style={styles.inner}>
          <View style={styles.center}>
            <Text style={styles.title}>{userInfo?.nickname}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.text}>{`${getAge(userInfo?.birthday)}세`}</Text>
          </View>
          <View style={styles.center}>
            <TouchableOpacity onPress={pickImage}>
              <BigProfile uri={photoUrl !== "" && photoUrl} fullVisible />
            </TouchableOpacity>
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
          <EachBox
            title={userInfo?.nickname + "님은"}
            tagsArray={whoAmIHash}
            onPress={() => navigation.navigate("MyWhoAmI")}
          />
          <EachBox
            title={userInfo?.nickname + "님의 이상형은"}
            tagsArray={idealsHash}
            onPress={() => navigation.navigate("MyIdealsChange")}
          />
          <EachBox
            title={userInfo?.nickname + "님의 취미는"}
            tagsArray={hobbiesHash}
            onPress={() => navigation.navigate("MyHobbiesChange")}
          />
          <View style={styles.boxContainer}>
            <View>
              <Text
                style={styles.blackHashText}
              >{`${userInfo?.nickname}님의 자기소개`}</Text>
              <Text>{userInfo?.introduction}</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("MyIntroductionChange")}
            >
              <Feather name="edit-2" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          ...styles.center,
          flexDirection: "column",
        }}
      >
        <Button text="적용하기" onPress={onSubmit} />
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
    alignItems: "center",
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
  headerContainer: {
    paddingHorizontal: 10,
  },
});
