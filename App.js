import Navigation from "./Navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getValue, save } from "./functions/secureStore";
import axios from "axios";
import key from "./lib/key.json";
import SocketContext, { socket } from "./context/socket";
import { UserContext } from "./context/user";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking } from "react-native";

//fonts
const customFont = {
  WaterMelon: require("./assets/116watermelon.otf"),
};

//notification
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);
  const [chatList, setChatList] = useState([]);
  const [fetchingDone, setFetchingDone] = useState(false);
  const [readingScreen, setReadingScreen] = useState("");
  const [pushPath, setPushPath] = useState("");

  const refreshUser = async () => {
    const token = await getValue("token");
    try {
      const headers = {
        Authorization: `Token ${token}`,
      };
      if (token) {
        const userInfo = await axios.get(`${key.API}/user/`, { headers });
        setUser(userInfo.data);
        if (userInfo.status === 200) {
          setIsLogin(true);
          setFetchingDone(true);
        }
      }
    } catch (error) {
      setUser(false);
      setIsLogin(false);
      setFetchingDone(true);
    }
  };

  const uploadToken = async () => {
    const token = await getValue("token");
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await axios.put(
      `${key.API}/user/`,
      { userNotificationToken: expoPushToken },
      {
        headers,
      }
    );
    setUser(response.data);
  };

  const getChatRoom = async (chatRoomId) => {
    try {
      const response = await axios.get(`${key.API}/chatroom/${chatRoomId}/`);
      if (response.status === 200) {
        addChatRoom(response.data);
      }
    } catch (e) {
      console.log(chatRoomId + "failed");
    }
  };

  const refreshChatList = async (userInfo) => {
    userInfo?.chats?.map((chatRoom) => {
      getChatRoom(chatRoom?.id);
    });
  };

  const addChatRoom = (chatRoom) => {
    const existInState = chatList.filter((l) => l.id === chatRoom.id);
    if (existInState.length === 0) {
      setChatList((prev) => [...prev, chatRoom]);
    }
  };

  const addNewMessage = (msg) => {
    setChatList((prev) =>
      prev.map((chatroom) => {
        if (chatroom.id === msg.chatRoomId) {
          return { ...chatroom, chats: [...chatroom.chats, msg] };
        } else {
          return chatroom;
        }
      })
    );
  };

  const addReadMessage = (msg) => {
    setChatList((prev) =>
      prev.map((chatroom) => {
        if (chatroom.id === msg.chatRoomId) {
          return {
            ...chatroom,
            chats: chatroom.chats.map((chat) => {
              if (chat.id === msg.id) {
                return msg;
              } else {
                return chat;
              }
            }),
          };
        } else {
          return chatroom;
        }
      })
    );
  };

  const UserValue = useMemo(
    () => ({
      userInfo: user,
      setUserInfo: setUser,
      refreshUserInfo: refreshUser,
      userChatList: chatList,
      refreshChatList: refreshChatList,
      setUserChatList: setChatList,
      addChatRoom: addChatRoom,
      readingScreen: readingScreen,
      setReadingScreen: setReadingScreen,
    }),
    [
      user,
      setUser,
      chatList,
      setChatList,
      addNewMessage,
      readingScreen,
      setReadingScreen,
    ]
  );

  //notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      save("pushToken", token);
      setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const url = response.notification.request.content.data.url;
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (
      readingScreen &&
      notification?.request?.content?.data?.chatRoomId === readingScreen
    ) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
          iosDisplayInForeground: false,
        }),
      });
    } else {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
          iosDisplayInForeground: true,
        }),
      });
    }
  }, [notification, readingScreen]);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const token = await getValue("token");
        if (token) {
          await refreshUser();
          if (expoPushToken) {
            await uploadToken();
          }
        } else {
          setUser({});
          setIsLogin(false);
          setFetchingDone(true);
        }
      } catch (e) {
        console.warn(e);
        setUser({});
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (expoPushToken && user?.userNotificationToken !== expoPushToken) {
      uploadToken();
    }
  }, [expoPushToken]);

  useEffect(() => {
    if (socket.disconnected && user?.id) {
      socket.connect();
      socket.emit("join", user.id);
      user?.chatRooms?.map((roomId) => {
        socket.emit("join", roomId);
        getChatRoom(roomId);
      });
    }

    return () => socket.disconnect();
  }, [user, socket]);

  useEffect(() => {
    if (user?.id === undefined) {
      socket.disconnect();
    }
  }, [user]);

  useEffect(() => {
    socket.on("join_please", () => {
      socket.emit("join", user.id);
      user?.chatRooms?.map((roomId) => {
        socket.emit("join", roomId);
        getChatRoom(roomId);
      });
    });
    socket.on("receiveMessage", (message) => {
      addNewMessage(message);
    });
    socket.on("allReaded", (messages) => {
      if (messages.length > 0) {
        messages.map((message) => addReadMessage(message));
      }
    });
    socket.on("chatRoomCreated", (chatRoomId, chatRoomInfo) => {
      socket.emit("join", chatRoomId);
      addChatRoom(chatRoomInfo);
    });
    socket.on("accepted", (userInfo) => {
      setUser(userInfo);
    });
  }, [socket]);

  useEffect(() => {
    if (!isLoading && fetchingDone) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isLoading]);

  return (
    <>
      <UserContext.Provider value={UserValue}>
        <SocketContext.Provider value={socket}>
          <Provider store={store}>
            <Navigation isLogin={isLogin} user={user} pushPath={pushPath} />
          </Provider>
        </SocketContext.Provider>
      </UserContext.Provider>
      <StatusBar style="dark" />
    </>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
