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
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { addChat, setChats } from "../../redux/reducers/chatsSlice";
import SocketContext from "../../context/socket";
import { UserContext } from "../../context/user";

const Chat = ({ stackNavigation }) => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const chatList = useSelector((state) => state.chats);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const { userInfo } = useContext(UserContext);

  const getChatRoom = async (chatRoomId) => {
    try {
      const response = await axios.get(`${key.API}/chatroom/${chatRoomId}/`);
      if (response.status === 200) {
        dispatch(addChat(response.data));
      }
    } catch (e) {
      console.log(chatRoomId + "failed");
    }
  };

  useEffect(() => {
    userInfo?.chatRooms?.map((chatRoom) => {
      socket.emit("join", chatRoom);
      getChatRoom(chatRoom);
    });
    socket?.on("chatRoomCreated", (chatRoomId, chatRoomInfo) => {
      addChat(chatRoomInfo);
      getChatRoom(chatRoomId);
    });
    socket.on("receiveMessage", (message) => getChatRoom(message.chatRoomId));

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
        {chatList?.map((chat, i) => {
          let counterPartId;
          chat.participants.map((participant) => {
            if (participant !== userInfo.id) {
              counterPartId = participant;
            }
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
              />
            </View>
          );
        })}
        {chatList.length === 0 && (
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
