import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import React from "react";
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

const options = categories.hobbies;

const MyHobbies = ({ navigation }) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [hobbies, setHobbies] = useState([]);

  useEffect(() => {
    if (hobbies.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [hobbies]);

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
              <Title text="가입하기" percent="4 / 8" />
              <View style={styles.subTitle}>
                <Text style={styles.ask}>어떤 취미를 가지고 계세요?</Text>
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
                        setHobbies((prev) => prev.concat(option));
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
                onPress={() => navigation.navigate("MyIdeals")}
              />
              <BackButton text="이전으로" onPress={() => navigation.pop()} />
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