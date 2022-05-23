import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";
import * as ImagePicker from "expo-image-picker";
import BigProfile from "../../components/BigProfile";

const ProfilePhoto = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (photoUrl !== "") {
      setButtonDisabled(false);
    }
  }, [photoUrl]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("권한을 승인해주십시오.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.cancelled) {
      setPhotoUrl(result.base64);
    }
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
            <Title text="가입하기" percent="3 / 8" />
            <View style={styles.inputContainer}>
              <Text style={styles.property}>프로필 사진</Text>
              <TouchableOpacity onPress={pickImage}>
                {photoUrl ? (
                  <BigProfile uri={`data:img/png;base64, ${photoUrl}`} />
                ) : (
                  <View style={styles.circle}></View>
                )}
              </TouchableOpacity>
              <Text style={styles.ask}>프로필 사진을 설정해주세요!</Text>
              <Text style={styles.ask}>
                되도록 얼굴이 나온 사진으로 하는 것이 좋습니다!
              </Text>
            </View>
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
    justifyContent: "space-between",
  },
  sexContainer: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    padding: 20,
    justifyContent: "space-evenly",
  },
  circle: {
    margin: 12,
    width: 250,
    height: 250,
    backgroundColor: colors.darkgray,
    borderRadius: 125,
  },
});
