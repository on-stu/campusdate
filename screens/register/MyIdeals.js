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
import { ScrollView } from "react-native";
import categories from "../../lib/categories.json";
import Option from "../../components/Option";
import { UserContext } from "../../context/user";
import { calculateIdeals } from "../../functions/calculateScore";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const MyIdeals = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [ideals, setIdeals] = useState([]);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (userInfo?.sex === "male") {
      setOptions(categories.idealsForBoy);
    } else if (userInfo?.sex === "female") {
      setOptions(categories.idealsForGirl);
    }
  }, [userInfo]);

  const onNext = () => {
    const tempUser = {
      myIdeals: ideals,
      myIdealsScore: calculateIdeals(ideals),
    };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("WhoAmI");
  };

  useEffect(() => {
    if (ideals.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [ideals]);

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
                percent="5 / 8"
                backbutton
                navigation={navigation}
              />
              <View style={styles.subTitle}>
                <Text style={styles.ask}>
                  이상형이 어떻게 되세요? {"(5개까지 선택 가능)"}
                </Text>
                <Text style={styles.property}>나의 이상형</Text>
              </View>
            </View>
            <View style={styles.options}>
              {options.map((option, i) => {
                if (ideals.includes(option)) {
                  return (
                    <Option
                      text={option}
                      key={i}
                      isChecked={ideals.includes(option)}
                      onPress={() => {
                        if (ideals.includes(option)) {
                          setIdeals((prev) =>
                            prev.filter((elm) => elm !== option)
                          );
                        } else {
                          setIdeals((prev) => prev.concat(option));
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
                    isChecked={ideals.includes(option)}
                    onPress={() => {
                      if (ideals.includes(option)) {
                        setIdeals((prev) =>
                          prev.filter((elm) => elm !== option)
                        );
                      } else {
                        if (ideals.length < 5) {
                          setIdeals((prev) => prev.concat(option));
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

export default MyIdeals;

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
