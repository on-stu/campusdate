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
import MyProfile from "./screens/MyProfile";
import FindMyLove from "./screens/FindMyLove";
import Profile from "./screens/Profile";
import Faq from "./screens/Faq/Faq";
import FaqDetail from "./screens/Faq/FaqDetail";
import Notice from "./screens/notice/Notice";
import NoticePost from "./screens/notice/NoticePost";
import MatchingLoading from "./screens/matching/MatchingLoading";
import MatchingSuccess from "./screens/matching/MatchingSuccess";
import MatchingFailed from "./screens/matching/MatchingFailed";
import MyWhoAmI from "./screens/my/MyWhoAmI";
import MyIdealsChange from "./screens/my/MyIdealsChange";
import MyHobbiesChange from "./screens/my/MyHobbiesChange";
import MyIntroductionChange from "./screens/my/MyIntroductionChange";
import NoticeDetail from "./screens/notice/NoticeDetail";
import FaqPost from "./screens/Faq/FaqPost";
import ChatScreen from "./screens/ChatScreen";
import Charm from "./screens/charm/Charm";
import CharmPost from "./screens/charm/CharmPost";
import CharmDetail from "./screens/charm/CharmDetail";
import Review from "./screens/review/Review";
import ReviewDetail from "./screens/review/ReviewDetail";
import ReviewPost from "./screens/review/ReviewPost";
import Event from "./screens/event/Event";
import EventPost from "./screens/event/EventPost";
import EventDetail from "./screens/event/EventDetail";
import OpenSourceList from "./screens/oss/OpenSourceList";
import OpenSourceDetail from "./screens/oss/OpenSourceDetail";
import ServiceTerms from "./screens/terms/ServiceTerms";
import PrivacyTerms from "./screens/terms/PrivacyTerms";
import CharmSearch from "./screens/charm/CharmSearch";
import EventSearch from "./screens/event/EventSearch";
import FaqSearch from "./screens/Faq/FaqSearch";
import NoticeSearch from "./screens/notice/NoticeSearch";
import ReviewSearch from "./screens/review/ReviewSearch";

const Stack = createStackNavigator();

export default function Navigation({ isLogin }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLogin && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="BottomTab" component={BottomTab} />
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
        {isLogin && <Stack.Screen name="Login" component={LoginScreen} />}
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MatchingLoading" component={MatchingLoading} />
        <Stack.Screen name="MatchingSuccess" component={MatchingSuccess} />
        <Stack.Screen name="MatchingFailed" component={MatchingFailed} />
        <Stack.Screen name="MyWhoAmI" component={MyWhoAmI} />
        <Stack.Screen name="MyIdealsChange" component={MyIdealsChange} />
        <Stack.Screen name="MyHobbiesChange" component={MyHobbiesChange} />
        <Stack.Screen
          name="MyIntroductionChange"
          component={MyIntroductionChange}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="Notice" component={Notice} />
        <Stack.Screen name="NoticePost" component={NoticePost} />
        <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
        <Stack.Screen name="NoticeSearch" component={NoticeSearch} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="FaqDetail" component={FaqDetail} />
        <Stack.Screen name="FaqPost" component={FaqPost} />
        <Stack.Screen name="FaqSearch" component={FaqSearch} />
        <Stack.Screen name="Charm" component={Charm} />
        <Stack.Screen name="CharmPost" component={CharmPost} />
        <Stack.Screen name="CharmDetail" component={CharmDetail} />
        <Stack.Screen name="CharmSearch" component={CharmSearch} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="ReviewPost" component={ReviewPost} />
        <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
        <Stack.Screen name="ReviewSearch" component={ReviewSearch} />
        <Stack.Screen name="Event" component={Event} />
        <Stack.Screen name="EventPost" component={EventPost} />
        <Stack.Screen name="EventDetail" component={EventDetail} />
        <Stack.Screen name="EventSearch" component={EventSearch} />
        <Stack.Screen name="OpenSourceList" component={OpenSourceList} />
        <Stack.Screen name="OpenSourceDetail" component={OpenSourceDetail} />
        <Stack.Screen name="ServiceTerms" component={ServiceTerms} />
        <Stack.Screen name="PrivacyTerms" component={PrivacyTerms} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
