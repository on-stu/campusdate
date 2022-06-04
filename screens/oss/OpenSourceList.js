import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ossLicenses from "../../lib/ossLicenses.json";
import colors from "../../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import Hr from "../../components/Hr";

const ListItem = ({ licenseName, last, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.list}>
          <Text>{licenseName}</Text>
        </View>
      </TouchableOpacity>
      {!last && <Hr />}
    </>
  );
};

const OpenSourceList = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>오픈소스 라이선스</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.inner}>
          {ossLicenses.map((oss, i) => (
            <ListItem
              key={i}
              licenseName={oss.libraryName}
              last={i === ossLicenses.length - 1}
              onPress={() =>
                navigation.navigate({
                  name: "OpenSourceDetail",
                  params: { oss },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpenSourceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.gray,
    borderColor: "transparent",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    width: "60%",
    marginHorizontal: 8,
  },
  header: {
    width: "100%",
    position: "relative",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    width: "100%",
    zIndex: -1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  inner: {
    padding: 20,
    paddingBottom: 4,
  },
  list: {
    paddingVertical: 10,
  },
});
