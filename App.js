import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getValue } from "./functions/secureStore";
import axios from "axios";
import key from "./lib/key.json";
import SocketContext, { socket } from "./context/socket";
import { Alert } from "react-native";
const customFont = {
  WaterMelon: require("./assets/116watermelon.otf"),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const token = await getValue("token");
        if (token) {
          setIsLogin(true);
          try {
            const headers = {
              Authorization: `Token ${token}`,
            };
            const userInfo = await axios.get(`${key.API}/user/`, { headers });
            setUser(userInfo.data);
          } catch (error) {
            setUser(false);
          }
        } else {
          setIsLogin(false);
        }
      } catch (e) {
        console.warn(e);
        setUser(false);
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
      console.log(user.id);
      socket.emit("join", user.id);
    });

    socket.on("chatRoomCreated", (chatRoomId) => {
      console.log("wow1");
      socket.emit("join", chatRoomId);
      socket.emit("test", chatRoomId);
    });

    socket.on("hi", () => {
      console.log("wow");
      Alert.alert("wow", "wow");
    });

    socket.on("pushEvent", (event) => {
      console.log(event);
    });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isLoading]);

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <Navigation isLogin={isLogin} user={user} />
        </Provider>
      </SocketContext.Provider>
      <StatusBar style="dark" />
    </>
  );
}
