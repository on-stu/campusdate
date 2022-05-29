import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import SmallProfile from "../../components/SmallProfile";
import colors from "../../lib/colors.json";
import NotificationCircle from "../../components/NotificationCircle";

const Chat = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>채팅</Text>
            <NotificationCircle num={9} />
          </View>
          <TouchableOpacity
            onPress={() => setIsNotificationOn((prev) => !prev)}
          >
            {isNotificationOn ? (
              <Feather name="bell" size={24} color={colors.darkgray} />
            ) : (
              <Feather name="bell-off" size={24} color={colors.darkgray} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <SmallProfile />
            <View>
              <View>
                <View>
                  <Text>캠퍼스 데이트 매니저</Text>
                  <Feather name="bell" size={24} color="black" />
                </View>
                <View>
                  <Text>2</Text>
                </View>
              </View>
              <View>
                <Text>안녕하세요</Text>
                <Text>12:30</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
