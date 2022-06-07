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
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import SafeAreaAndroid from "../components/SafeAreaAndroid";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { sendPushNotification } from "../functions/sendPushNotification";
import * as Notifications from "expo-notifications";

const ChatScreen = ({ route }) => {
  const [profileInfo, setProfileInfo] = useState();
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();
  const {
    params: { chatInfo, counterPartId },
  } = route;

  const scrollViewRef = useRef(null);

  const socket = useContext(SocketContext);

  const { userInfo, userChatList } = useContext(UserContext);

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

  useEffect(() => {
    return () => {
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
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
        iosDisplayInForeground: false,
      }),
    });
  }, []);

  useEffect(() => {
    userChatList.map((chatroom) => {
      if (chatroom.id === chatInfo.id) {
        setChatMessages(chatroom.chats);
      }
    });
  }, [userChatList]);

  const onSendMessage = () => {
    socket.emit(
      "sendMessage",
      chatInfo.id,
      userInfo.id,
      counterPartId,
      message
    );
    sendPushNotification(
      profileInfo.userNotificationToken,
      userInfo.nickname,
      message
    );
    setMessage("");
  };

  useEffect(() => {
    socket.emit("readAll", chatInfo.id, userInfo.id);
  }, [chatMessages]);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={44}
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
      </View>
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
    width: Dimensions.get("screen").width,
    padding: 15,
  },
  textInputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
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
