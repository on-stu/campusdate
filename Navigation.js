import LoginScreen from "./screens/LoginScreen";
import BasicInfomation from "./screens/register/BasicInfomation";
import EmailAndPassword from "./screens/register/EmailAndPassword";
import EmailVerification from "./screens/register/EmailVerification";
import MyHobbies from "./screens/register/MyHobbies";
import MyIdeals from "./screens/register/MyIdeals";
import MyIntroduction from "./screens/register/MyIntroduction";
import ProfilePhoto from "./screens/register/ProfilePhoto";
import { createStackNavigator } from "@react-navigation/stack";
import WhoAmI from "./screens/register/WhoAmI";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./screens/bottomTabs/BottomTab";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/reducers/userSlice";

const Stack = createStackNavigator();

export default function Navigation({ isLogin, user }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLogin && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="BottomTab" component={BottomTab} user={user} />
        <Stack.Screen name="EmailAndPassword" component={EmailAndPassword} />
        <Stack.Screen name="BasicInfomation" component={BasicInfomation} />
        <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} />
        <Stack.Screen name="MyHobbies" component={MyHobbies} />
        <Stack.Screen name="MyIdeals" component={MyIdeals} />
        <Stack.Screen name="WhoAmI" component={WhoAmI} />
        <Stack.Screen name="MyIntroduction" component={MyIntroduction} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
