import Navigation from "./Navigation";
import { useState, useEffect, useMemo, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getValue } from "./functions/secureStore";
import axios from "axios";
import key from "./lib/key.json";
import SocketContext, { socket } from "./context/socket";
import { useEffectOnce } from "./functions/useEffectOnce";
import { UserContext } from "./context/user";
import { Alert } from "react-native";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const customFont = {
  WaterMelon: require("./assets/116watermelon.otf"),
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);

  //notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const refreshUser = async () => {
    const token = await getValue("token");
    try {
      const headers = {
        Authorization: `Token ${token}`,
      };
      if (token) {
        const userInfo = await axios.get(`${key.API}/user/`, { headers });
        setUser(userInfo.data);
      }
    } catch (error) {
      setUser(false);
    }
  };

  const UserValue = useMemo(
    () => ({
      userInfo: user,
      setUserInfo: setUser,
      refreshUserInfo: refreshUser,
    }),
    [user, setUser]
  );

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const token = await getValue("token");
        if (token) {
          setIsLogin(true);
          await refreshUser();
        } else {
          setUser({});
          setIsLogin(false);
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
    if (socket.disconnected && user) {
      socket.connect();
      socket.emit("join", user.id);
      user?.chatRooms?.map((roomId) => {
        socket.emit("join", roomId);
      });
    }

    return () => socket.disconnect();
  }, [user, socket]);

  useEffect(() => {
    socket.on("join_please", () => {
      socket.emit("join", user.id);
      user?.chatRooms?.map((roomId) => {
        socket.emit("join", roomId);
      });
    });
  }, []);

  useEffectOnce(() => {
    socket.on("chatRoomCreated", (chatRoomId) => {
      socket.emit("join", chatRoomId);
    });

    socket.on("receiveMessage", (message) => {
      if (isLoading) {
        Alert.alert("");
      }
    });

    socket.on("pushEvent", (event) => {
      console.log(event);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        await SplashScreen.hideAsync();
        socket.off("receiveMessage");
      })();
    }
  }, [isLoading]);

  return (
    <>
      <UserContext.Provider value={UserValue}>
        <SocketContext.Provider value={socket}>
          <Provider store={store}>
            <Navigation isLogin={isLogin} user={user} />
          </Provider>
        </SocketContext.Provider>
      </UserContext.Provider>
      <StatusBar style="dark" />
    </>
  );
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
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
    console.log(token);
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
