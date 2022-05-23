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

const ProfilePhoto = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (photoUrl !== "" && age !== "") {
      setButtonDisabled(false);
    }
  }, [photoUrl, age]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.container}>
            <Title text="가입하기" percent="3 / 8" />
            <View style={styles.inputContainer}></View>
            <View style={styles.buttonContainer}>
              <Button text="다음으로" disabled={buttonDisabled} />
              <BackButton text="이전으로" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ProfilePhoto;

const styles = StyleSheet.create({
  property: {
    fontSize: 14,
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
