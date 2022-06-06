import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import Title from "../../components/Title";
import colors from "../../lib/colors.json";
import Button from "../../components/Button";
import ShadowInput from "../../components/ShadowInput";
import axios from "axios";
import key from "../../lib/key.json";
import { UserContext } from "../../context/user";
import { getValue } from "../../functions/secureStore";

function ValidatePassword(password) {
  if (
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
      password
    )
  ) {
    return true;
  }
  return false;
}

const ChangePassword = ({ navigation }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const { userInfo } = useContext(UserContext);

  const onSubmit = async () => {
    try {
      const token = await getValue("token");
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.put(
        `${key.API}/change_password/${userInfo.id}/`,
        {
          old_password: oldPassword,
          password: newPassword,
          password2: newPasswordConfirm,
        },
        { headers }
      );
      if (response.status === 200) {
        Alert.alert("성공", "비밀번호가 성공적으로 변경되었습니다.");
        navigation.pop();
      } else {
        Alert.alert("실패", "예상치 못한 에러가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("실패", `예상치 못한 에러가 발생했습니다.\n${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Title text="비밀번호 변경" backbutton navigation={navigation} />
        <View style={styles.subTitle}>
          <Text style={styles.property}>기존 비밀번호</Text>
          <ShadowInput
            secure={true}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <View style={styles.askContainer}></View>
          <Text style={styles.property}>새 비밀번호</Text>
          <ShadowInput
            secure={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <View style={styles.askContainer}>
            {newPassword !== "" && !ValidatePassword(newPassword) && (
              <Text style={styles.ask}>
                비밀번호 조건 : 8자 이상, 영문 혼합, 특수문자
              </Text>
            )}
          </View>
          <Text style={styles.property}>새 비밀번호 확인</Text>
          <ShadowInput
            secure={true}
            value={newPasswordConfirm}
            onChangeText={setNewPasswordConfirm}
          />
          <View style={styles.askContainer}>
            {newPasswordConfirm !== "" &&
              newPasswordConfirm !== newPassword && (
                <Text style={styles.ask}>새 비밀번호를 확인해주세요.</Text>
              )}
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="변경하기" disabled={false} onPress={onSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

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
    height: 20,
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
