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
import ProfileImg from "../../img/profile.svg";
import ShadowInput from "../../components/ShadowInput";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import Check from "../../components/Check";
import BackButton from "../../components/BackButton";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";

const BasicInfomation = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("male");
  const [age, setAge] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (nickname !== "" && age !== "") {
      setButtonDisabled(false);
    }
  }, [nickname, age]);

  const toggleSex = () => {
    if (sex === "male") {
      setSex("female");
    } else {
      setSex("male");
    }
  };

  const onNext = () => {
    const tempUser = { nickname, sex, age };
    dispatch(setUser(tempUser));
    navigation.navigate("ProfilePhoto");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Title text="가입하기" percent="2 / 8" />
            <ProfileImg width={250} height={250} />
            <View style={styles.inputContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.property}>이름</Text>
              </View>
              <ShadowInput value={nickname} onChangeText={setNickname} />
              <View style={styles.askContainer}>
                <Text style={styles.ask}>이름을 알려주세요!</Text>
              </View>
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
              <View style={styles.askContainer}>
                <Text style={styles.ask}>성별을 알려주세요!</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.property}>나이</Text>
              </View>
              <ShadowInput value={age} onChangeText={setAge} num />
              <View style={styles.askContainer}>
                <Text style={styles.ask}>나이를 알려주세요!</Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                text="다음으로"
                disabled={buttonDisabled}
                onPress={onNext}
              />
              <BackButton text="이전으로" onPress={() => navigation.pop()} />
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
  buttonContainer: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sexContainer: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    padding: 20,
    justifyContent: "space-evenly",
  },
});
