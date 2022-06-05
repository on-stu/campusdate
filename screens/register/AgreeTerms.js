import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Title from "../../components/Title";
import colors from "../../lib/colors.json";
import PrivacyInner from "../../components/PrivacyInner";
import Hr from "../../components/Hr";
import ServiceInner from "../../components/ServiceInner";
import MiniCheck from "../../components/MiniCheck";

const AgreeTerms = ({ navigation }) => {
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (serviceAgree && privacyAgree) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [serviceAgree, privacyAgree]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.inner}>
          <Title
            text="약관동의"
            percent="0 / 8"
            navigation={navigation}
            backbutton
          />
          <View style={styles.inputContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.property}>서비스 이용약관 (필수)</Text>

              <MiniCheck
                isChecked={serviceAgree}
                onPress={() => setServiceAgree((prev) => !prev)}
              />
            </View>
            <Hr />
            <ScrollView
              style={{ height: 200 }}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
              vertical={true}
              alwaysBounceHorizontal={false}
              contentContainerStyle={{ width: "100%" }}
            >
              <ServiceInner />
            </ScrollView>
            <Hr />
            <View style={styles.textContainer}>
              <Text style={styles.property}>개인정보 처리방침 (필수)</Text>
              <MiniCheck
                isChecked={privacyAgree}
                onPress={() => setPrivacyAgree((prev) => !prev)}
              />
            </View>
            <Hr />
            <ScrollView
              style={{ height: 200 }}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
              horizontal={false}
            >
              <PrivacyInner />
            </ScrollView>
            <Hr />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={buttonDisabled}
            text="가입하기"
            onPress={() => navigation.navigate("EmailAndPassword")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AgreeTerms;

const styles = StyleSheet.create({
  property: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
  },
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
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
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  inner: {
    width: "100%",
    alignItems: "center",
  },
  sexContainer: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    padding: 20,
    justifyContent: "space-evenly",
  },
  birthdayContainer: {
    width: 300,
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.gray,
    borderRadius: 10,
    marginVertical: 10,
  },
  birthdayText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
