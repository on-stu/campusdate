import Navigation from "./Navigation";
import { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const customFont = {
  WaterMelon: require("./assets/116watermelon.otf"),
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFont);
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoading)
      (async () => {
        await SplashScreen.hideAsync();
      })();
  }, [isLoading]);

  return (
    <>
      <Provider store={store}>
        <Navigation />
      </Provider>
      <StatusBar style="dark" />
    </>
  );
}
