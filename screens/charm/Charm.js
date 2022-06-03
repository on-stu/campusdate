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
import NoticeIcon from "../../img/notice.svg";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { setCharm } from "../../redux/reducers/charmSlice";
import { setCharms } from "../../redux/reducers/charmsSlice";

import { UserContext } from "../../context/user";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Charm = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);

  const charms = useSelector((state) => state.charms);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (charms.length === 0) {
      (async () => {
        const response = await axios.get(`${key.API}/charm/`);
        dispatch(setCharms(response.data));
      })();
    }
  }, [charms]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>매력어필</Text>
          <NoticeIcon height={72} width={122} />
        </View>
        <View style={styles.header}>
          <SearchBar placeholder="매력어필 검색하기" />
        </View>
        <View style={styles.inner}>
          {charms.map((charm, i) => (
            <ListItem
              authorId={charm?.authorId}
              createdAt={charm?.createdAt}
              title={charm.title}
              key={i}
              fullVisible={!charm?.isAnonymous}
              thumbsNum={charm?.thumbs?.length}
              commentsNum={charm?.comments?.length}
              onPress={() => {
                dispatch(setCharm(charm));
                navigation.navigate("CharmDetail", {
                  charm: charm.id,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("CharmPost");
        }}
      >
        <View style={styles.button}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>글쓰기</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Charm;

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
