import MainScreen from "./screens/MainScreen";
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainScreen} />
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
