import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";

import { UserContext } from "../../context/user";

const MyIntroduction = ({ navigation }) => {
  const [introduction, setIntroduction] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);
  const onNext = () => {
    const tempUser = { introduction };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("EmailVerification");
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
            <View style={styles.inputContainer}>
              <Title
                text="가입하기"
                percent="7 / 8"
                backbutton
                navigation={navigation}
              />
              <View style={styles.subTitle}>
                <Text style={styles.ask}>
                  혹시 자신에 대해 더 소개할 말이 있으신가요?
                </Text>
                <Text style={styles.property}>나는 이런 사람이에요.</Text>
              </View>
              <TextInput
                multiline={true}
                placeholder="터치해서 글쓰기"
                value={introduction}
                onChangeText={setIntroduction}
                style={styles.subTitle}
                maxLength={500}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button text="다음으로" disabled={false} onPress={onNext} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MyIntroduction;

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});
