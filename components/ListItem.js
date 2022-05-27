import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";

const ListItem = ({
  author,
  time,
  title,
  thumbsNum,
  commentsNum,
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
          <View style={styles.bottomContainer}>
            <Feather name="thumbs-up" size={16} color={colors.pink} />
            <Text style={styles.thumbs}>{thumbsNum}</Text>
            <Feather name="message-circle" size={16} color={colors.purple} />
            <Text style={styles.comments}>{commentsNum}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {!last && <Hr />}
    </View>
  );
};

export default ListItem;

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
  comments: {
    color: colors.darkgray,
    marginLeft: 2,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  thumbs: {
    color: colors.darkgray,
    marginHorizontal: 2,
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
