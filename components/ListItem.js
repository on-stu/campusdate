import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import colors from "../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";
import { getValue } from "../functions/secureStore";
import key from "../lib/key.json";
import axios from "axios";
import { getTimeString } from "../functions/getTimeString";
import { UserContext } from "../context/user";

const ListItem = ({
  authorId,
  createdAt,
  title,
  thumbsNum,
  commentsNum,
  onPress,
  last,
  fullVisible,
  navigation,
}) => {
  const [author, setAuthor] = useState({});
  const { userInfo } = useContext(UserContext);
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
            onPress={() =>
              navigation.navigate("Profile", {
                userId: authorId,
                preventChat:
                  userInfo.skipUser.includes(authorId) ||
                  userInfo?.sex === author?.sex,
              })
            }
          />
          <Text style={styles.time}>{timeString}</Text>
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
