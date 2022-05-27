import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";

const ListItemFaq = ({
  author,
  time,
  title,
  status,
  onPress,
  last,
  fullVisible,
}) => {
  return (
    <View style={styles.itemBox}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.spacebetween}>
          <SmallProfileCard nickname={author} fullVisible={fullVisible} />
          <Text
            style={styles.time}
          >{`${time?.getMonth()}/${time?.getDate()} ${time?.getHours()}:${time?.getMinutes()}`}</Text>
        </View>
        <View style={{ ...styles.spacebetween, ...styles.contentBox }}>
          <Text>{title}</Text>
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
