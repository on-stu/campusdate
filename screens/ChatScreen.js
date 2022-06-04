import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { getValue } from "../functions/secureStore";
import axios from "axios";
import key from "../lib/key.json";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import SocketContext from "../context/socket";
import { useEffectOnce } from "../functions/useEffectOnce";
import MyChat from "../components/MyChat";
import { UserContext } from "../context/user";
import YourChat from "../components/YourChat";

const ChatScreen = ({ navigation, route }) => {
  const [profileInfo, setProfileInfo] = useState();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const {
    params: { chatInfo, counterPartId },
  } = route;

  const scrollViewRef = useRef(null);

  const socket = useContext(SocketContext);

  const { userInfo, setUserChatList, userChatList, refreshChatList } =
    useContext(UserContext);

  const getProfile = async (userId) => {
    const token = await getValue("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    try {
      const response = await axios.get(`${key.API}/user/${userId}/`, {
        headers,
      });
      setProfileInfo(response.data);
    } catch (error) {
      if (error.response.status === 404) {
        setProfileInfo({ id: 0, nickname: "알 수 없는 사용자" });
      }
    }
  };

  const refreshChatMessages = async () => {
    const response = await axios.get(`${key.API}/chatroom/${chatInfo.id}/`);
    setChatMessages(response.data.chats);
  };

  const addChatMessage = (message) => {
    if (!chatMessages.includes(message)) {
      setChatMessages((prev) => [...prev, message]);
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => addChatMessage(message));
    socket.on("readMessage", (readMessage) => {
      setChatMessages((prev) => {
        return prev.map((msg) =>
          msg.id === readMessage.id ? readMessage : msg
        );
      });
    });
    return () => {
      socket.off("readMessage");
      refreshChatList();
      scrollViewRef.current = null;
    };
  }, [scrollViewRef, socket]);

  useEffectOnce(() => {
    if (profileInfo?.id === undefined) {
      getProfile(counterPartId);
    }
    if (chatMessages.length === 0) {
      refreshChatMessages();
    }
  }, []);

  useEffect(() => {
    const newChatList = userChatList?.map((chatRoom) => {
      if (chatRoom.id === chatInfo.id) {
        return { ...chatRoom, chats: chatMessages };
      } else {
        return chatRoom;
      }
    });
    setUserChatList(newChatList);
  }, [chatMessages]);

  const onSendMessage = () => {
    socket.emit(
      "sendMessage",
      chatInfo.id,
      userInfo.id,
      counterPartId,
      message
    );
    setMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Feather name="chevron-left" size={24} color="black" />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{profileInfo?.nickname}</Text>
              </View>
            </View>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
            >
              <View style={styles.container}>
                <View>
                  {chatMessages.map((chat, i) => {
                    if (chat.senderId === `${userInfo.id}`) {
                      return (
                        <MyChat
                          key={i}
                          text={chat.content}
                          fullVisible
                          photoUrl={userInfo.photoUrl}
                          isRead={chat.isRead}
                        />
                      );
                    } else {
                      if (!chat.isRead) {
                        socket.emit("readMessage", chatInfo.id, chat.id);
                      }
                      return (
                        <YourChat
                          key={i}
                          text={chat.content}
                          fullVisible
                          photoUrl={profileInfo?.photoUrl}
                        />
                      );
                    }
                  })}
                </View>
              </View>
            </ScrollView>
          </>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="메시지를 입력해주세요"
              value={message}
              onChangeText={setMessage}
              blurOnSubmit={false}
              multiline={false}
              onSubmitEditing={onSendMessage}
            />
            <TouchableOpacity onPress={onSendMessage}>
              <Feather name="send" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.gray,
    borderColor: "transparent",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    width: "60%",
    marginHorizontal: 8,
  },
  header: {
    width: "100%",
    position: "relative",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    width: "100%",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  inner: {
    padding: 20,
    paddingBottom: 4,
  },
  commentsContainer: {
    paddingHorizontal: 20,
  },
});
