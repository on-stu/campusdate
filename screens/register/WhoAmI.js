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

const WhoAmI = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [ideals, setIdeals] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (userInfo?.sex === "male") {
      setOptions(categories.idealsForGirl);
    } else if (userInfo?.sex === "female") {
      setOptions(categories.idealsForBoy);
    }
  }, [userInfo]);

  const onNext = () => {
    const tempUser = { whoAmI: ideals, whoAmIScore: calculateIdeals(ideals) };
    setUserInfo({ ...userInfo, ...tempUser });
    navigation.navigate("MyIntroduction");
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
                text="????????????"
                percent="6 / 8"
                backbutton
                navigation={navigation}
              />
              <View style={styles.subTitle}>
                <Text style={styles.ask}>
                  ??????????????? ????????????? {"(5????????? ?????? ??????)"}
                </Text>
                <Text style={styles.property}>?????? ?????? ???????????????.</Text>
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
                          Alert.alert("??????", "?????? 5????????? ?????? ???????????????.");
                        }
                      }
                    }}
                  />
                );
              })}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                text="????????????"
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

export default WhoAmI;

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
    marginBottom: 20,
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
