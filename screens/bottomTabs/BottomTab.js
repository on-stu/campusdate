import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./Chat";
import Home from "./Home";
import Notification from "./Notification";
import Setting from "./Setting";

const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} stackNavigation={navigation} />
      <Tab.Screen name="Chat" component={Chat} stackNavigation={navigation} />
      <Tab.Screen
        name="Notification"
        component={Notification}
        stackNavigation={navigation}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        stackNavigation={navigation}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
