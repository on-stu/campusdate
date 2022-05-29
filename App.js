import Navigation from "./Navigation";
import { useState, useEffect, useRef } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { getValue } from "./functions/secureStore";
import axios from "axios";
import key from "./lib/key.json";
import useWebSockets from "./functions/useWebSockets";

const customFont = {
  WaterMelon: require("./assets/116watermelon.otf"),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(false);
  const { joinRoom } = useWebSockets();

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
            joinRoom(userInfo.data.id);
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
    if (!isLoading) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isLoading]);

  return (
    <>
      <Provider store={store}>
        <Navigation isLogin={isLogin} user={user} />
      </Provider>
      <StatusBar style="dark" />
    </>
  );
}
