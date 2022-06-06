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
import NotificationCircle from "../../components/NotificationCircle";
import colors from "../../lib/colors.json";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const Notification = () => {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [notifications, setNotifications] = useState([]);
  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>알림</Text>
            <NotificationCircle num={notifications.length} />
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
        <View></View>
        {notifications.length === 0 && (
          <View style={styles.innerCenter}>
            <Text style={styles.noText}>알림이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

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
  innerCenter: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  noText: {
    color: colors.darkgray,
  },
});
