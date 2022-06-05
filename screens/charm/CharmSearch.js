import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { useDispatch } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { setCharm } from "../../redux/reducers/charmSlice";

const CharmSearch = ({ navigation }) => {
  const [charms, setCharms] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(false);

  const onSearch = async () => {
    if (search.length < 2) {
      Alert.alert("경고", "검색어는 두 글자 이상으로 해주세요.");
    } else {
      const response = await axios.get(`${key.API}/charm/?search=${search}`);
      setCharms(response.data);
      if (response.data.length === 0) {
        setNotFound(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: "10%" }}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Feather name="chevron-left" size={24} color={colors.darkgray} />
          </TouchableOpacity>
        </View>
        <View style={{ width: "90%" }}>
          <SearchBar
            placeholder="검색하기"
            onSubmit={onSearch}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.inner}>
          {charms.length === 0 && !notFound ? (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundText}>검색어를 입력해주세요.</Text>
            </View>
          ) : (
            notFound && (
              <View style={styles.notFoundContainer}>
                <Text style={styles.notFoundText}>
                  {search}에 대한 검색결과가 없습니다.
                </Text>
              </View>
            )
          )}
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
    </SafeAreaView>
  );
};

export default CharmSearch;

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
    paddingHorizontal: 10,
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
  notFoundContainer: {
    width: "100%",
    marginVertical: 40,
    padding: 20,
    alignItems: "center",
  },
  notFoundText: {
    color: colors.pink,
  },
});
