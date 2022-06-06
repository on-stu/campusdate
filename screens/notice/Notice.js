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
import { setNotice } from "../../redux/reducers/noticeSlice";
import { setNotices } from "../../redux/reducers/noticesSlice";
import { UserContext } from "../../context/user";
import Header from "../../components/Header";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Notice = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);

  const notices = useSelector((state) => state.notices);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.get(`${key.API}/notice/`).then((response) => {
      dispatch(setNotices(response.data));
      wait(500).then(() => {
        setRefreshing(false);
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${key.API}/notice/`);
      dispatch(setNotices(response.data));
    })();
  }, []);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <Header
        title="공지사항"
        onBackPress={() => navigation.pop()}
        onSearchPress={() => navigation.navigate("NoticeSearch")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.inner}>
          {notices.map((notice, i) => (
            <ListItem
              authorId={notice?.authorId}
              createdAt={notice?.createdAt}
              title={notice.title}
              key={i}
              fullVisible
              thumbsNum={notice?.thumbs?.length}
              commentsNum={notice?.comments?.length}
              onPress={() => {
                dispatch(setNotice(notice));
                navigation.navigate("NoticeDetail", {
                  noticeId: notice.id,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
      {userInfo?.is_admin && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("NoticePost");
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

export default Notice;

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
