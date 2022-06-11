import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./Chat";
import Home from "./Home";
import Notification from "./Notification";
import Setting from "./Setting";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import { TouchableOpacity } from "react-native";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user";
import BottomTabIcon from "../../components/BottomTabIcon";
import SocketContext from "../../context/socket";

const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
  const { userChatList, userInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const getTotalNotCount = () => {
    let count = 0;
    userChatList.map((chatroom) => {
      chatroom.chats.map((chat) => {
        if (!chat.isRead && chat.senderId !== userInfo.id.toString()) {
          count += 1;
        }
      });
    });
    return count;
  };

  const totalNotRead = useMemo(
    () => getTotalNotCount(),
    [userChatList, socket]
  );
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
        children={() => (
          <Chat stackNavigation={navigation} totalNotRead={totalNotRead} />
        )}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <BottomTabIcon
                iconName="chat"
                focused={focused}
                totalNotRead={totalNotRead}
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
        children={() => <Setting stackNavigation={navigation} />}
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
