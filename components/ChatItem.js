import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SmallProfile from "./SmallProfile";
import colors from "../lib/colors.json";
import NotificationCircle from "./NotificationCircle";
import { getValue } from "../functions/secureStore";
import axios from "axios";
import key from "../lib/key.json";
import { getTimeString } from "../functions/getTimeString";

const ChatItem = ({ isMute, counterPartId, onPress, lastAt, notRead }) => {
  const [counterPart, setCounterPart] = useState({});
  useEffect(() => {
    if (counterPartId) {
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${key.API}/user/${counterPartId}/`, {
          headers,
        });
        setCounterPart(response.data);
      })();
    }
  }, [counterPartId]);
  const timeString = getTimeString(lastAt);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chatRoomBox}>
        <View style={styles.profileContainer}>
          <SmallProfile fullVisible={true} uri={counterPart.photoUrl} />
          <View style={styles.middleContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nickname}>{counterPart.nickname}</Text>
              {isMute && (
                <Feather name="bell-off" size={16} color={colors.darkgray} />
              )}
            </View>
            <Text>안녕하세요</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <NotificationCircle num={notRead} />
          <Text>{timeString}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatRoomBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleContainer: {
    marginLeft: 8,
    justifyContent: "space-between",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  nickname: {
    fontSize: 18,
    fontWeight: "700",
    marginRight: 4,
  },
});
