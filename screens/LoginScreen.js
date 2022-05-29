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
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/userSlice";
import { getValue, save } from "../functions/secureStore";
import { getUserWithToken } from "../functions/getUserWithToken";
import SocketContext from "../context/socket";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (userInfo.id !== undefined) {
      navigation.reset({
        routes: [{ name: "BottomTab" }],
      });
    }
  }, [userInfo]);

  const onSubmit = async () => {
    try {
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
      dispatch(setUser(user.data));
      navigation.reset({
        routes: [{ name: "BottomTab" }],
      });
    } catch (error) {
      console.log(error);
      Alert.alert("경고", "이메일 혹은 비밀번호가 틀립니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
                placeholder="이메일"
                email
              />
              <ShadowInput
                secure={true}
                value={password}
                onChangeText={setPassword}
                placeholder="비밀번호"
              />
              <Button text="로그인" onPress={onSubmit} />
              <View style={styles.textContainer}>
                <View style={styles.eachText}>
                  <Text style={styles.text}>계정이 없으신가요?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("EmailAndPassword")}
                  >
                    <Text style={styles.underline}>가입하기</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.eachText}>
                  <Text style={styles.text}>비밀번호를 잊으셨나요?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProfilePhoto")}
                  >
                    <Text style={styles.underline}>비밀번호 재설정</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
});
