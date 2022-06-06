import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import colors from "../../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import ListItem from "../../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { setEvent } from "../../redux/reducers/eventSlice";
import { setEvents } from "../../redux/reducers/eventsSlice";
import { UserContext } from "../../context/user";
import Header from "../../components/Header";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Event = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);

  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.get(`${key.API}/event/`).then((response) => {
      dispatch(setEvents(response.data));
      wait(500).then(() => {
        setRefreshing(false);
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${key.API}/event/`);
      dispatch(setEvents(response.data));
    })();
  }, []);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <Header
        title="이벤트"
        onBackPress={() => navigation.pop()}
        onSearchPress={() => navigation.navigate("EventSearch")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.inner}>
          {events.length > 0 &&
            events.map((event, i) => (
              <ListItem
                authorId={event?.authorId}
                createdAt={event?.createdAt}
                title={event.title}
                key={i}
                fullVisible
                thumbsNum={event?.thumbs?.length}
                commentsNum={event?.comments?.length}
                onPress={() => {
                  dispatch(setEvent(event));
                  navigation.navigate("EventDetail");
                }}
              />
            ))}
          {events.length === 0 && (
            <View style={styles.noEventsContainer}>
              <Text style={styles.noEventText}>
                진행중인 이벤트가 없습니다.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      {userInfo?.is_admin && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("EventPost");
          }}
        >
          <View style={styles.button}>
            <Feather name="edit" size={24} color="white" />
            <Text style={styles.buttonText}>글쓰기</Text>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  inner: {
    width: "100%",
  },
  button: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: colors.pink,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    bottom: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 4,
  },
  noEventsContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  noEventText: {
    color: colors.darkgray,
  },
});
