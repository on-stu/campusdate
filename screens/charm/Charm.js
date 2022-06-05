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
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Charm = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);

  const charms = useSelector((state) => state.charms);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSearch("");
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

  useEffect(() => {
    if (search === "") {
      (async () => {
        const response = await axios.get(`${key.API}/charm/`);
        dispatch(setCharms(response.data));
      })();
    }
  }, [search]);

  const onSearch = async () => {
    const response = await axios.get(`${key.API}/charm/?search=${search}`);
    dispatch(setCharms(response.data));
  };

  return (
    <SafeAreaView style={styles.container}>
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
