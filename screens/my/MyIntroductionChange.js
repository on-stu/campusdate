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
import React, { useEffect } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../lib/colors.json";
import BackButton from "../../components/BackButton";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import { getValue } from "../../functions/secureStore";
import key from "../../lib/key.json";
import axios from "axios";

const MyIntroductionChange = ({ navigation }) => {
  const [introduction, setIntroduction] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const onNext = async () => {
    const token = await getValue("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(
      `${key.API}/user/`,
      { introduction },
      {
        headers,
      }
    );
    dispatch(setUser(response.data));
    navigation.pop();
  };

  useEffect(() => {
    setIntroduction(userInfo?.introduction);
  }, [userInfo]);

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
              <Title text="프로필 변경" />
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
              <Button text="변경하기" disabled={false} onPress={onNext} />
              <BackButton text="취소" onPress={() => navigation.pop()} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MyIntroductionChange;

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
});
