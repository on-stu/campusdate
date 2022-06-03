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
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { setEvent } from "../../redux/reducers/eventSlice";
import { setEvents } from "../../redux/reducers/eventsSlice";
import { UserContext } from "../../context/user";

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
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (events.length === 0) {
      (async () => {
        const response = await axios.get(`${key.API}/event/`);
        dispatch(setEvents(response.data));
      })();
    }
  }, [events]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>이벤트</Text>
          <eventIcon height={72} width={122} />
        </View>
        <View style={styles.header}>
          <SearchBar placeholder="이벤트 검색하기" />
        </View>
        <View style={styles.inner}>
          {events.map((event, i) => (
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
});