import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import React, { useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import Check from "../../components/Check";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native";
import categories from "../../lib/categories.json";
import Option from "../../components/Option";
import { UserContext } from "../../context/user";
import { calculateHobbies } from "../../functions/calculateScore";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const options = categories.hobbies;

const MyHobbies = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [hobbies, setHobbies] = useState([]);
  const { setUserInfo, userInfo } = useContext(UserContext);

  const onNext = () => {
    const tempUser = {
      myHobbies: hobbies,
      myHobbiesScore: calculateHobbies(hobbies),
    };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("MyIdeals");
  };

  useEffect(() => {
    if (hobbies.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [hobbies]);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
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
            <View style={styles.inputContainer}>
              <Title
                text="가입하기"
                percent="4 / 8"
                backbutton
                navigation={navigation}
              />
              <View style={styles.subTitle}>
                <Text style={styles.ask}>
                  어떤 취미를 가지고 계세요? {"(5개까지 선택 가능)"}
                </Text>
                <Text style={styles.property}>나의 취미</Text>
              </View>
            </View>
            <View style={styles.options}>
              {options.map((option, i) => {
                if (hobbies.includes(option)) {
                  return (
                    <Option
                      text={option}
                      key={i}
                      isChecked={hobbies.includes(option)}
                      onPress={() => {
                        if (hobbies.includes(option)) {
                          setHobbies((prev) =>
                            prev.filter((elm) => elm !== option)
                          );
                        } else {
                          setHobbies((prev) => [...prev, option]);
                        }
                      }}
                    />
                  );
                }
              })}
            </View>
            <ScrollView contentContainerStyle={styles.subTitle}>
              {options.map((option, i) => {
                return (
                  <Check
                    text={option}
                    key={i}
                    isChecked={hobbies.includes(option)}
                    onPress={() => {
                      if (hobbies.includes(option)) {
                        setHobbies((prev) =>
                          prev.filter((elm) => elm !== option)
                        );
                      } else {
                        if (hobbies.length < 5) {
                          setHobbies((prev) => prev.concat(option));
                        } else {
                          Alert.alert("경고", "최대 5개까지 선택 가능합니다.");
                        }
                      }
                    }}
                  />
                );
              })}
            </ScrollView>
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

export default MyHobbies;

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
    backgroundColor: colors.darkgray,
    borderRadius: 125,
  },
});
