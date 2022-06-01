import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import * as ImagePicker from "expo-image-picker";
import BigProfile from "../../components/BigProfile";
import { manipulateAsync } from "expo-image-manipulator";
import { UserContext } from "../../context/user";
import AvatarIcon from "../../img/avatar.svg";

const ProfilePhoto = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const onNext = () => {
    const tempUser = {
      photoUrl: `data:img/png;base64,${photoUrl}`,
    };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("MyHobbies");
  };

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

  const resizeImg = async (uri) => {
    console.log(uri);
    try {
      const result = await manipulateAsync(
        uri,
        [
          {
            resize: {
              width: 500,
            },
          },
        ],
        {
          base64: true,
        }
      );

      return result.base64;
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    });
    if (!result.cancelled) {
      const resized = await resizeImg(result.uri);
      setPhotoUrl(resized);
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
            <Title
              text="가입하기"
              percent="3 / 8"
              backbutton={true}
              navigation={navigation}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.property}>프로필 사진 선택</Text>
              <TouchableOpacity onPress={pickImage}>
                {photoUrl ? (
                  <BigProfile
                    uri={`data:img/png;base64, ${photoUrl}`}
                    fullVisible
                  />
                ) : (
                  <AvatarIcon width={250} height={250} />
                )}
              </TouchableOpacity>
              <View style={styles.askContainer}>
                <Text style={styles.ask}>프로필 사진을 설정해주세요!</Text>
                <Text style={styles.ask}>
                  되도록 얼굴이 나온 사진으로 하는 것이 좋습니다!
                </Text>
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

export default ProfilePhoto;

const styles = StyleSheet.create({
  property: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  textContainer: {
    width: 300,
    marginTop: 10,
  },
  askContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginVertical: 10,
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
    backgroundColor: colors.gray,
    borderRadius: 125,
  },
});
