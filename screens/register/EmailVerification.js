import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";
import { Picker } from "@react-native-picker/picker";
import SelectButton from "../../components/SelectButton";
import ShadowInput from "../../components/ShadowInput";
import PopUp from "../../components/PopUp";
import axios from "axios";
import key from "../../lib/key.json";
import emailValue from "../../lib/email.json";
import { Alert } from "react-native";
import { save } from "../../functions/secureStore";
import { UserContext } from "../../context/user";
import SocketContext from "../../context/socket";

const EmailVerification = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [university, setUniversity] = useState("대학을 선택해주세요");
  const [univEmail, setUnivEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);
  useEffect(() => {
    if (verifiedEmail !== "") {
      setUserInfo({ ...userInfo, university });
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [verifiedEmail]);

  const verifyEmail = async () => {
    if (univEmail.includes(emailValue[university])) {
      const response = await axios.post(`${key.API}/emailchecker/`, {
        email: univEmail,
      });
      if (response.status === 200) {
        setVerifiedEmail(univEmail);
        return true;
      } else {
        setVerifiedEmail("");
        Alert.alert(
          "인증실패",
          "인증에 실패하였습니다.\n 메일주소를 확인해주세요"
        );
        return false;
      }
    } else {
      setVerifiedEmail("");
      setUnivEmail("");
      Alert.alert(
        "경고",
        `${university}의 이메일은 ${emailValue[university]}입니다.`
      );
      return false;
    }
  };

  const onSubmit = async () => {
    console.log("chatroom is", userInfo.chatRooms);
    const response = await axios.post(`${key.API}/register/`, {
      ...userInfo,
      chatRooms: [],
    });
    const {
      data: { userInfo: user, token },
    } = response;
    setUserInfo(user);
    save("token", token);
    socket.connect();
    socket.emit("join", user.id);
    navigation.reset({
      routes: [{ name: "BottomTab" }],
    });
  };

  return (
    <>
      <PopUp visible={visible} setVisible={setVisible}>
        <View style={{ width: 300, height: 300, zIndex: 11 }}>
          <Picker
            selectedValue={university}
            onValueChange={(itemValue, _) => setUniversity(itemValue)}
          >
            <Picker.Item
              label="대학을 선택해주세요"
              value="대학을 선택해주세요"
            />
            <Picker.Item label="부산대학교" value="부산대학교" />
          </Picker>
        </View>
      </PopUp>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <Title text="가입하기" percent="8 / 8" />
                <View style={styles.subTitle}>
                  <Text style={styles.ask}>마지막 단계에요,</Text>
                  <Text style={styles.ask}>
                    대학교 웹 메일로 학교 인증을 해주세요!
                  </Text>
                </View>
                <View style={styles.section}>
                  <SelectButton
                    text={university}
                    onPress={() => setVisible(true)}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.property}>인증용 대학교 웹 메일</Text>
                </View>
                <ShadowInput
                  value={univEmail}
                  onChangeText={setUnivEmail}
                  email
                />
                {verifiedEmail !== "" && (
                  <View style={styles.askContainer}>
                    <Text style={styles.ask}>인증에 성공했습니다.</Text>
                  </View>
                )}
                <View style={styles.miniButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (university === "대학을 선택해주세요") {
                        return Alert.alert("대학을 선택해주세요");
                      }
                      if (univEmail !== "") {
                        verifyEmail();
                      }
                    }}
                  >
                    <View style={styles.miniButton}>
                      <Text style={styles.miniButtonText}>인증받기</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  text="가입하기!"
                  disabled={buttonDisabled}
                  onPress={onSubmit}
                />
                <BackButton text="이전으로" onPress={() => navigation.pop()} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  property: {
    fontSize: 16,
    fontWeight: "700",
  },
  textContainer: {
    width: 300,
    marginTop: 10,
  },
  askContainer: {
    width: 300,
    marginTop: -5,
  },
  ask: {
    color: colors.pink,
  },
  subTitle: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: Dimensions.get("screen").width,
    display: "flex",
    alignContent: "flex-start",
  },
  options: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  inputContainer: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    justifyContent: "flex-start",
  },
  buttonContainer: {},
  section: {
    width: Dimensions.get("screen").width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  miniButtonContainer: {
    width: 300,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  miniButton: {
    marginTop: 10,
    width: 100,
    height: 45,
    backgroundColor: colors.purple,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  miniButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
});
