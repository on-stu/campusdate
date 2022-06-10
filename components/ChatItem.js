import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import SmallProfile from "./SmallProfile";
import colors from "../lib/colors.json";
import NotificationCircle from "./NotificationCircle";
import { getValue } from "../functions/secureStore";
import axios from "axios";
import key from "../lib/key.json";
import { getTimeString } from "../functions/getTimeString";
import { UserContext } from "../context/user";
import { getBlurNickname } from "../functions/getBlurNickname";

const ChatItem = ({
  isMute,
  participants,
  onPress,
  notRead,
  lastItem,
  lastAt,
}) => {
  const [counterPart, setCounterPart] = useState({});
  const { userInfo } = useContext(UserContext);
  const [counterPartId, setCounterPartId] = useState();
  console.log(counterPart);
  useEffect(() => {
    setCounterPartId(participants.filter((elm) => elm !== userInfo.id)[0]);
    if (counterPartId) {
      getCounterPart();
    }
  }, [participants, counterPartId]);

  const isAccepted = useMemo(
    () => userInfo?.accepted?.includes(counterPartId),
    [userInfo, counterPartId]
  );
  const getCounterPart = async () => {
    try {
      const token = await getValue("token");
      const headers = {
        Authorization: `Token ${token}`,
      };
      const response = await axios.get(`${key.API}/user/${counterPartId}/`, {
        headers,
      });
      setCounterPart(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setCounterPart({ id: 0, nickname: "알 수 없는 사용자" });
      }
    }
  };

  const timeString = lastItem
    ? getTimeString(lastItem?.createdAt)
    : getTimeString(lastAt);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.chatRoomBox}>
        <View style={styles.profileContainer}>
          <SmallProfile fullVisible={isAccepted} uri={counterPart.photoUrl} />
          <View style={styles.middleContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.nickname}>
                {isAccepted || counterPart.id === 0
                  ? counterPart.nickname
                  : getBlurNickname(counterPart.nickname)}
              </Text>
              {isMute && (
                <Feather name="bell-off" size={16} color={colors.darkgray} />
              )}
            </View>
            <Text>{lastItem?.content}</Text>
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
