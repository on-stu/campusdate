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
import { setCharm } from "../../redux/reducers/charmSlice";
import { setCharms } from "../../redux/reducers/charmsSlice";
import { UserContext } from "../../context/user";
import Header from "../../components/Header";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
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
    axios.get(`${key.API}/charm/`).then((response) => {
      dispatch(setCharms(response.data));
      wait(500).then(() => {
        setRefreshing(false);
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${key.API}/charm/`);
      dispatch(setCharms(response.data));
    })();
  }, []);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <Header
        title="매력어필"
        onBackPress={() => navigation.pop()}
        onSearchPress={() => navigation.navigate("CharmSearch")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
          console.log("wow");
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
