import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";
import { getTimeString } from "../functions/getTimeString";
import key from "../lib/key.json";
import { getValue } from "../functions/secureStore";
import axios from "axios";

const ListItemFaq = ({
  authorId,
  createdAt,
  status,
  onPress,
  last,
  fullVisible,
  title,
}) => {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    if (authorId) {
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${key.API}/user/${authorId}/`, {
          headers,
        });
        setAuthor(response.data);
      })();
    }
  }, [authorId]);
  const timeString = getTimeString(createdAt);
  return (
    <View style={styles.itemBox}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.spacebetween}>
          <SmallProfileCard
            nickname={author?.nickname}
            photoUrl={author?.photoUrl}
            fullVisible={fullVisible}
          />
          <Text style={styles.time}>{timeString}</Text>
        </View>
        <View style={{ ...styles.spacebetween, ...styles.contentBox }}>
          <Text>{fullVisible ? title : "비밀글 입니다."}</Text>
          <View style={styles.waitContainer}>
            <Text style={status === "done" ? styles.done : styles.wait}>
              {status === "done" ? "답변 완료" : "답변 대기중"}
            </Text>
            {status === "done" ? (
              <Feather name="check" size={16} color={colors.pink} />
            ) : (
              <Feather name="clock" size={16} color={colors.purple} />
            )}
          </View>
        </View>
      </TouchableOpacity>
      {!last && <Hr />}
    </View>
  );
};

export default ListItemFaq;

const styles = StyleSheet.create({
  itemBox: {
    width: "100%",
    padding: 20,
    paddingBottom: 0,
  },
  spacebetween: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentBox: {
    paddingVertical: 10,
  },
  wait: {
    color: colors.purple,
    fontWeight: "700",
    marginRight: 2,
  },
  waitContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  done: {
    color: colors.pink,
    fontWeight: "700",
    marginRight: 2,
  },
  time: {
    color: colors.darkgray,
  },
  spacebetween: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
