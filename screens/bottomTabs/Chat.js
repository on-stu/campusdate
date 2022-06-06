import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import NotificationCircle from "../../components/NotificationCircle";
import ChatItem from "../../components/ChatItem";
import SocketContext from "../../context/socket";
import { UserContext } from "../../context/user";
import { useNavigation } from "@react-navigation/native";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const Chat = ({ stackNavigation }) => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [notReadMessages, setNotReadMessages] = useState([]);
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const { userInfo, userChatList, refreshChatList, setUserChatList } =
    useContext(UserContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      refreshChatList(userInfo);
    });
    return unsubscribe;
  }, []);

  const getTotalNotCount = () => {
    let count = 0;
    userChatList.map((chatroom) => {
      chatroom.chats.map((chat) => {
        if (!chat.isRead && chat.senderId !== userInfo.id.toString()) {
          count += 1;
        }
      });
    });
    return count;
  };

  const totalNotRead = useMemo(() => getTotalNotCount(), [userChatList]);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>채팅</Text>
            <NotificationCircle num={totalNotRead} />
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsNotificationOn((prev) => !prev);
            }}
          >
            {isNotificationOn ? (
              <Feather name="bell" size={24} color={colors.darkgray} />
            ) : (
              <Feather name="bell-off" size={24} color={colors.darkgray} />
            )}
          </TouchableOpacity>
        </View>
        {userChatList.map((chat, i) => {
          let counterPartId;
          chat?.participants?.map((participant) => {
            if (participant !== userInfo.id) {
              counterPartId = participant;
            }
          });
          const notRead = userChatList[i]?.chats.filter(
            (elm) =>
              elm.senderId !== userInfo.id.toString() && elm.isRead === false
          ).length;
          return (
            <View style={styles.inner} key={i}>
              <ChatItem
                counterPartId={counterPartId}
                lastAt={chat?.lastAt}
                onPress={() => {
                  stackNavigation.navigate({
                    name: "ChatScreen",
                    params: { counterPartId, chatInfo: chat },
                  });
                }}
                notRead={notRead}
                chats={userChatList[i]?.chats}
                lastItem={
                  userChatList[i]?.chats[userChatList[i].chats.length - 1]
                }
              />
            </View>
          );
        })}
        {userChatList.length === 0 && (
          <View style={styles.innerCenter}>
            <Text style={styles.subtitle}>현재 진행중인 채팅이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inner: {
    paddingHorizontal: 20,
    width: Dimensions.get("screen").width,
    marginBottom: 10,
  },
  innerCenter: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: colors.darkgray,
  },
});
