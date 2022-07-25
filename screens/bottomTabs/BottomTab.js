import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Chat from "./Chat";
import Home from "./NewHome";
import Notification from "./Notification";
import Setting from "./Setting";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import { Image, TouchableOpacity, useColorScheme, View } from "react-native";
import { useContext, useMemo } from "react";
import { UserContext } from "../../context/user";
import HomeIcon from "../../assets/bottomTab/homeIcon.png";
import SocketContext from "../../context/socket";
import SettingsIcon from "../../svg/SettingsIcon";
import ProfileIcon from "../../svg/ProfileIcon";
import ChatIcon from "../../svg/ChatIcon";
import NotificationIcon from "../../svg/NotificationIcon";

const Tab = createBottomTabNavigator();

function BottomTab({ navigation }) {
  const { userChatList, userInfo } = useContext(UserContext);
  const socket = useContext(SocketContext);

  const theme = useColorScheme();

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
        tabBarStyle: {
          backgroundColor: theme === "light" ? colors.white : colors.black,
          borderTopWidth: 0,
          paddingHorizontal: 8,
          paddingVertical: 16,
          paddingBottom: 40,
        },

        tabBarButton: (props) => <TouchableOpacity {...props} />,
      }}
    >
      <Tab.Screen
        name="Profile"
        children={() => <Home stackNavigation={navigation} />}
        options={{
          tabBarIcon: ({ focused }) => {
            return <ProfileIcon />;
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
            return <ChatIcon />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  position: "absolute",
                  width: 70,
                  height: 70,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: colors.black,
                  borderRadius: 45,
                  bottom: -10,
                }}
              >
                <Image source={HomeIcon} style={{ width: 70, height: 70 }} />
              </View>
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
            return <NotificationIcon />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        children={() => <Setting stackNavigation={navigation} />}
        options={{
          tabBarIcon: ({ focused }) => {
            return <SettingsIcon />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
