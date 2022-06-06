import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import LoginImg from "../../img/login.svg";
import ShadowInput from "../../components/ShadowInput";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import axios from "axios";
import key from "../../lib/key.json";
import { UserContext } from "../../context/user";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const EmailAndPassword = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);

  const onNext = async () => {
    try {
      const response = await axios.post(`${key.API}/emailvalidate/`, { email });
      if (response.status === 200) {
        const tempUser = { email, password };
        setUserInfo({ ...userInfo, ...tempUser });
        navigation.navigate("BasicInfomation");
      }
    } catch (error) {
      if ((error.code = "ERR_NETWORK")) {
        Alert.alert(
          "경고",
          "네트워크 문제로 가입할 수 없습니다.\n나중에 다시 시도해주세요."
        );
      }
      console.log(error.code);
      Alert.alert("경고", "이미 가입된 이메일입니다.");
      setEmail("");
    }
  };

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }

  function ValidatePassword(password) {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        password
      )
    ) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (
      ValidateEmail(email) &&
      password !== "" &&
      ValidatePassword(password) &&
      password === confirm
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, confirm]);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Title
                text="가입하기"
                percent="1 / 8"
                navigation={navigation}
                backbutton
              />
              <LoginImg width={300} height={300} />
              <View style={styles.textContainer}>
                <Text style={styles.property}>이메일</Text>
              </View>
              <ShadowInput email={true} value={email} onChangeText={setEmail} />
              <View style={styles.askContainer}>
                {email !== "" && !ValidateEmail(email) && (
                  <Text style={styles.ask}>
                    이메일 형식이 올바르지 않습니다.
                  </Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.property}>비밀번호</Text>
                </View>
                <ShadowInput
                  value={password}
                  onChangeText={setPassword}
                  secure={true}
                />
                <View style={styles.askContainer}>
                  {password !== "" && !ValidatePassword(password) && (
                    <Text style={styles.ask}>
                      비밀번호 조건 : 8자 이상, 영문 혼합, 특수문자
                    </Text>
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.property}>비밀번호 확인</Text>
                </View>
                <ShadowInput
                  value={confirm}
                  onChangeText={setConfirm}
                  secure={true}
                />
                <View style={styles.askContainer}>
                  {confirm !== "" && confirm !== password && (
                    <Text style={styles.ask}>비밀번호를 확인해주세요.</Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text="다음으로"
                disabled={buttonDisabled}
                onPress={onNext}
              />
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
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    width: 300,
    marginTop: 5,
  },
  askContainer: {
    width: 300,
    height: 20,
    marginTop: -5,
  },
  ask: {
    color: colors.pink,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
