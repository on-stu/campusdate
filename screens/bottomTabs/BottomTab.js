import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./Chat";
import Home from "./Home";
import Notification from "./Notification";
import Setting from "./Setting";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.pink },
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      }}
    >
      <Tab.Screen
        name="Home"
        children={() => <Home stackNavigation={navigation} />}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="home"
                size={24}
                color={focused ? "white" : colors.darkgray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        stackNavigation={navigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="message-circle"
                size={24}
                color={focused ? "white" : colors.darkgray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        stackNavigation={navigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="bell"
                size={24}
                color={focused ? "white" : colors.darkgray}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        stackNavigation={navigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="settings"
                size={24}
                color={focused ? "white" : colors.darkgray}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
