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
import FaqIcon from "../../img/faq.svg";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItemFaq from "../../components/ListItemFaq";

const Faq = () => {
  const now = new Date();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>문의사항</Text>
          <FaqIcon height={72} width={122} />
        </View>
        <View style={styles.header}>
          <SearchBar placeholder="문의사항 검색하기" />
        </View>
        <View style={styles.inner}>
          <ListItemFaq
            author="관리자"
            status="done"
            time={now}
            title="예시 문의사항"
            fullVisible
          />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" />
          <ListItemFaq author="관리자" time={now} title="예시 문의사항" last />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.button}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>문의하기</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Faq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  inner: {
    width: "100%",
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.pink,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    bottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 4,
  },
});
