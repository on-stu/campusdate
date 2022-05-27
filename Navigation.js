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
import MyProfile from "./screens/MyProfile";
import FindMyLove from "./screens/FindMyLove";
import Profile from "./screens/Profile";
import Faq from "./screens/Faq/Faq";
import FaqDetail from "./screens/Faq/FaqDetail";
import Notice from "./screens/notice/Notice";
import NoticePost from "./screens/notice/NoticePost";
import MatchingLoading from "./screens/matching/MatchingLoading";

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
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="FindMyLove" component={FindMyLove} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="FaqDetail" component={FaqDetail} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="NoticePost" component={NoticePost} />
        <Stack.Screen name="MatchingLoading" component={MatchingLoading} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
