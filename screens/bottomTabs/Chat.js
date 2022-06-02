import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import NotificationCircle from "../../components/NotificationCircle";
import ChatItem from "../../components/ChatItem";
import SocketContext from "../../context/socket";
import { UserContext } from "../../context/user";

const Chat = ({ stackNavigation }) => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const socket = useContext(SocketContext);
  const { userInfo, userChatList, refreshChatList } = useContext(UserContext);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      // dispatch(setEachChat(message));
    });
    refreshChatList(userInfo);
    return () => socket.off("receiveMessage");
  }, [userInfo, socket]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>채팅</Text>
            <NotificationCircle num={9} />
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
        {userChatList?.map((chat, i) => {
          let counterPartId;
          let notRead = 0;
          chat.participants.map((participant) => {
            if (participant !== userInfo.id) {
              counterPartId = participant;
            }
          });
          chat.chats.map((elm) => {
            if (elm.isRead === false) notRead += 1;
          });

          return (
            <View style={styles.inner} key={i}>
              <ChatItem
                counterPartId={counterPartId}
                lastAt={chat.lastAt}
                onPress={() => {
                  stackNavigation.navigate({
                    name: "ChatScreen",
                    params: { counterPartId, chatInfo: chat },
                  });
                }}
                notRead={notRead}
              />
            </View>
          );
        })}
        {userChatList?.length === 0 && (
          <View style={styles.innerCenter}>
            <Text>현재 진행중인 채팅이 없습니다.</Text>
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
});
