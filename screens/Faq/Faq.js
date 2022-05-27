import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import colors from "../../lib/colors.json";
import FaqIcon from "../../img/faq.svg";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItemFaq from "../../components/ListItemFaq";
import { useDispatch, useSelector } from "react-redux";
import key from "../../lib/key.json";

import axios from "axios";
import { setFaqs } from "../../redux/reducers/faqsSlice";
import { setFaq } from "../../redux/reducers/faqSlice";

const Faq = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);
  const faqs = useSelector((state) => state.faqs);
  const dispatch = useDispatch();
  useEffect(() => {
    if (faqs.length === 0) {
      (async () => {
        const response = await axios.get(`${key.API}/faq/`);
        dispatch(setFaqs(response.data));
      })();
    }
  }, [faqs]);
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
          {faqs.map((faq, i) => (
            <ListItemFaq
              fullVisible={!faq?.isSecret || userInfo?.is_admin ? true : false}
              authorId={faq?.authorId}
              createdAt={faq?.createdAt}
              title={faq?.title}
              key={i}
              onPress={() => {
                dispatch(setFaq(faq));
                navigation.navigate("FaqDetail");
              }}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FaqPost");
        }}
      >
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
