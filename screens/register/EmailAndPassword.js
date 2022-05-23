import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Title from "../../components/Title";
import LoginImg from "../../img/login.svg";
import ShadowInput from "../../components/ShadowInput";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EmailAndPassword = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (ValidateEmail(email) && password !== "" && password === confirm) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, confirm]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Title text="가입하기" percent="1 / 8" />
            <LoginImg width={300} height={300} />
            <View style={styles.textContainer}>
              <Text style={styles.property}>이메일</Text>
            </View>
            <ShadowInput email={true} value={email} onChangeText={setEmail} />
            <View style={styles.inputContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.property}>비밀번호</Text>
              </View>
              <ShadowInput
                value={password}
                onChangeText={setPassword}
                secure={true}
              />
              <View style={styles.textContainer}>
                <Text style={styles.property}>비밀번호 확인</Text>
              </View>
              <ShadowInput
                value={confirm}
                onChangeText={setConfirm}
                secure={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button text="다음으로" disabled={buttonDisabled} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EmailAndPassword;

const styles = StyleSheet.create({
  property: {
    fontSize: 14,
    fontWeight: "700",
  },
  textContainer: {
    width: 300,
    marginTop: 5,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
