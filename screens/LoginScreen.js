import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LogoImg from "../img/LOGO.svg";
import ShadowInput from "../components/ShadowInput";
import Button from "../components/Button";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import colors from "../lib/colors.json";
import { TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              <Button
                text="로그인"
                onPress={() =>
                  navigation.reset({
                    routes: [{ name: "BottomTab" }],
                  })
                }
              />
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
                  <TouchableOpacity>
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
