import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import ProfileImg from "../../img/profile.svg";
import ShadowInput from "../../components/ShadowInput";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import Check from "../../components/Check";
import { UserContext } from "../../context/user";
import DateTimePicker from "@react-native-community/datetimepicker";
import PopUp from "../../components/PopUp";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const BasicInfomation = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("male");
  const [show, setShow] = useState(false);
  const [birthday, setBirthday] = useState(new Date(2000, 0, 1));
  const { userInfo, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    const now = new Date();
    if (nickname !== "" && now.getFullYear() - birthday.getFullYear() > 18) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [nickname, birthday]);

  const toggleSex = () => {
    if (sex === "male") {
      setSex("female");
    } else {
      setSex("male");
    }
  };

  const onNext = () => {
    const tempUser = { nickname, sex, birthday };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("ProfilePhoto");
  };

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <PopUp visible={show} setVisible={setShow}>
        {show && (
          <DateTimePicker
            style={{ width: 300, height: 300 }}
            locale="ko"
            mode="date"
            value={birthday}
            onChange={(event, date) => {
              const currentDateInt = Date.parse(date);
              const currentDate = new Date(currentDateInt).setUTCHours(9);
              setBirthday(new Date(currentDate));
            }}
            display="spinner"
          />
        )}
      </PopUp>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <View style={styles.inner}>
              <Title
                text="가입하기"
                percent="2 / 8"
                navigation={navigation}
                backbutton
              />
              <ProfileImg width={250} height={250} />
              <View style={styles.inputContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.property}>이름</Text>
                </View>
                <ShadowInput value={nickname} onChangeText={setNickname} />

                <View style={styles.textContainer}>
                  <Text style={styles.property}>성별</Text>
                </View>
                <View style={styles.sexContainer}>
                  <Check
                    text="남성"
                    isChecked={sex === "male" ? true : false}
                    onPress={() => toggleSex()}
                  />
                  <Check
                    text="여성"
                    isChecked={sex === "female" ? true : false}
                    onPress={() => toggleSex()}
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.property}>생년월일</Text>
                </View>
                <TouchableOpacity onPress={() => setShow(true)}>
                  <View style={styles.birthdayContainer}>
                    <Text
                      style={styles.birthdayText}
                    >{`${birthday.getFullYear()}년 ${
                      birthday.getMonth() + 1
                    }월 ${birthday.getDate()}일`}</Text>
                  </View>
                </TouchableOpacity>
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

export default BasicInfomation;

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
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  buttonContainer: {
    marginBottom: 10,
  },
  inner: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sexContainer: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    padding: 20,
    justifyContent: "space-evenly",
  },
  birthdayContainer: {
    width: 300,
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.gray,
    borderRadius: 10,
    marginVertical: 10,
  },
  birthdayText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
