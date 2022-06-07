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
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { sendPushNotification } from "../functions/sendPushNotification";
import * as Notifications from "expo-notifications";
import { getBlurNickname } from "../functions/getBlurNickname";

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

  const isAccepted = useMemo(
    () => userInfo.accepted.includes(counterPartId),
    [userInfo]
  );

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
    const showSubscription = Keyboard.addListener("keyboardDidShow", () =>
      scrollViewRef.current.scrollToEnd({ animated: true })
    );
    return () => showSubscription.remove();
  }, []);

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

  useEffect(() => {
    if (socket.disconnected) {
      socket.connect();
    }
    const shouldJoin = [userInfo.id, ...userInfo.chatRooms];
    shouldJoin.map((roomId) => {
      socket.emit("join", roomId);
    });
  }, [socket]);

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
                  <Text style={styles.title}>
                    {userInfo.accepted.includes(counterPartId)
                      ? profileInfo?.nickname
                      : getBlurNickname(profileInfo?.nickname)}
                  </Text>
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
                            isRead={chat.isRead}
                          />
                        );
                      } else {
                        return (
                          <YourChat
                            key={i}
                            text={chat.content}
                            fullVisible={isAccepted}
                            photoUrl={profileInfo?.photoUrl}
                            onPress={() =>
                              navigation.navigate("Profile", {
                                userId: profileInfo?.id,
                                preventChat: true,
                              })
                            }
                          />
                        );
                      }
                    })}
                  </View>
                </View>
              </ScrollView>
            </>
          </TouchableWithoutFeedback>
          {isAccepted || chatInfo.creatorId === userInfo.id ? (
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
          ) : (
            <View style={styles.footerAsk}>
              <View style={styles.askContainer}>
                <Text style={styles.ask}>{`${getBlurNickname(
                  profileInfo.nickname
                )}님께서 메시지를 보냈습니다.`}</Text>
                <Text style={styles.ask}>
                  프로필 확인과 채팅을 위해 아래 수락버튼을 눌러주세요.
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() =>
                    socket.emit("acceptUser", userInfo.id, counterPartId)
                  }
                >
                  <View style={styles.acceptButton}>
                    <Text style={styles.acceptText}>수락</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.refuseButton}>
                    <Text style={styles.acceptText}>거절</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
  footerAsk: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.5,
    borderColor: colors.gray,
    width: Dimensions.get("screen").width,
    paddingVertical: 15,
    paddingBottom: 20,
  },
  acceptButton: {
    backgroundColor: colors.pink,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  refuseButton: {
    backgroundColor: colors.purple,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    marginHorizontal: 4,
  },
  acceptText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  askContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    marginBottom: 20,
  },
  ask: {
    color: colors.pink,
  },
});
