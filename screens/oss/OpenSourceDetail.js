import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const OpenSourceDetail = ({ navigation, route }) => {
  const {
    params: { oss },
  } = route;
  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{oss?.libraryName}</Text>
          </View>
        </View>
        <View style={styles.inner}>
          <Text style={styles.property}>description</Text>
          <Text>{oss?._description}</Text>
          <Text style={styles.property}>license</Text>
          <Text>{oss?._license}</Text>
          <Text style={styles.property}>author</Text>
          <Text>{oss?.author?.name}</Text>
          <Text style={styles.property}>homepage</Text>
          <Text>{oss?.homepage}</Text>
          <Text style={styles.property}>repository</Text>
          <Text>{oss?.repository?.url}</Text>
          <Text style={styles.property}>version</Text>
          <Text>{oss?.version}</Text>
          <Text style={styles.property}>license content</Text>
          <Text>{oss?._licenseContent}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OpenSourceDetail;

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
  property: {
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 4,
  },
});
