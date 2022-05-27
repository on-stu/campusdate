import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import { getTimeString } from "../functions/getTimeString";
import { useDispatch, useSelector } from "react-redux";
import { setFaq } from "../redux/reducers/faqSlice";
import key from "../lib/key.json";
import axios from "axios";
import { setFaqById } from "../redux/reducers/faqsSlice";

const FaqContent = ({ author, fullVisible }) => {
  const [timeString, setTimeString] = useState("");
  const userInfo = useSelector((state) => state.user);
  const faq = useSelector((state) => state.faq);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeString(getTimeString(faq.createdAt));
  }, [faq]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SmallProfileCard
          nickname={author?.nickname}
          photoUrl={author?.photoUrl}
          fullVisible={true}
        />
        <Text style={styles.time}>{timeString}</Text>
      </View>
      <View style={styles.inner}>
        <Text style={styles.title}>{faq?.title}</Text>
        <Text>{faq?.content}</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.bottomInfo}>
          {faq?.done ? (
            <>
              <Text>답변 완료</Text>
              <Feather name="check" size={16} color={colors.pink} />
            </>
          ) : (
            <>
              <Text style={styles.waitText}>답변 대기중</Text>
              <Feather name="clock" size={16} color={colors.purple} />
            </>
          )}
        </View>
      </View>
      <Hr />
    </View>
  );
};

export default FaqContent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    color: colors.darkgray,
  },
  inner: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 8,
  },
  bottomElement: {
    marginLeft: 4,
  },
  bottomText: {
    marginLeft: 4,
    color: colors.darkgray,
  },
  bottomInfo: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  miniButton: {
    flexDirection: "row",
    backgroundColor: colors.pink,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  miniButtonDisabled: {
    flexDirection: "row",
    backgroundColor: colors.darkgray,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  waitText: {
    color: colors.purple,
    marginRight: 4,
  },
  doneText: {
    color: colors.pink,
    marginRight: 4,
  },
});
