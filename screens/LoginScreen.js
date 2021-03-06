import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import LogoImg from "../img/LOGO.svg";
import ShadowInput from "../components/ShadowInput";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from "react-native";
import colors from "../lib/colors.json";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import key from "../lib/key.json";
import SocketContext from "../context/socket";
import { UserContext } from "../context/user";
import { getValue, save } from "../functions/secureStore";
import SafeAreaAndroid from "../components/SafeAreaAndroid";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (userInfo.id !== undefined) {
      navigation.reset({
        routes: [{ name: "BottomTab" }],
      });
    }
  }, [userInfo]);

  const uploadToken = async (expoPushToken) => {
    const token = await getValue("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(
      `${key.API}/user/`,
      { userNotificationToken: expoPushToken },
      {
        headers,
      }
    );
    setUserInfo(response.data);
  };

  const onSubmit = async () => {
    try {
      const expoPushToken = await getValue("pushToken");
      const response = await axios.post(`${key.API}/login/`, {
        email,
        password,
      });
      // console.log(response.data);
      const {
        data: { token },
      } = response;
      // console.log(token);
      save("token", token);
      const headers = {
        Authorization: `Token ${token}`,
      };
      const user = await axios.get(`${key.API}/user/`, { headers });
      // console.log(user.data);
      setUserInfo(user.data);
      if (
        !user.data.userNotificationToken &&
        expoPushToken !== user.data?.userNotificationToken
      ) {
        await uploadToken(expoPushToken);
      }
      navigation.reset({
        routes: [{ name: "BottomTab" }],
      });
    } catch (error) {
      console.log(error);
      Alert.alert("??????", "????????? ?????? ??????????????? ????????????.");
    }
  };

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <View style={styles.top}>
                <LogoImg width={280} height={280} />
              </View>
              <View style={styles.bottom}>
                <ShadowInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="?????????"
                  email
                />
                <ShadowInput
                  secure={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="????????????"
                />
                <Button text="?????????" onPress={onSubmit} />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => navigation.navigate("AgreeTerms")}
                >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>????????????</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <View style={styles.eachText}>
                    <Text style={styles.text}>??????????????? ????????????????</Text>
                    <TouchableOpacity
                      onPress={() =>
                        Alert.alert(
                          "?????????",
                          "?????? ???????????? ????????? ????????? ???????????? ????????????.\nminsu0523@naver.com?????? ?????? ??????????????? ????????? ????????????????????????."
                        )
                      }
                    >
                      <Text style={styles.underline}>???????????? ?????????</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  inner: {
    flex: 1,
  },
  top: {
    display: "flex",
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    display: "flex",
    height: "50%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  eachText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    margin: 2,
    color: colors.darkgray,
  },
  underline: {
    margin: 2,
    textDecorationLine: "underline",
    color: colors.darkgray,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#ffffff", fontWeight: "700", fontSize: 20 },
});
