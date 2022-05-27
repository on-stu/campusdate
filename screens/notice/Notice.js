import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../lib/colors.json";
import NoticeIcon from "../../img/notice.svg";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { setNotice } from "../../redux/reducers/noticeSlice";
import { initNotices, setNotices } from "../../redux/reducers/noticesSlice";

const Notice = ({ navigation }) => {
  const userInfo = useSelector((state) => state.user);
  const notices = useSelector((state) => state.notices);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notices.length === 0) {
      (async () => {
        const response = await axios.get(`${key.API}/notice/`);
        dispatch(setNotices(response.data));
      })();
    }
  }, [notices]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>공지사항</Text>
          <NoticeIcon height={72} width={122} />
        </View>
        <View style={styles.header}>
          <SearchBar placeholder="공지사항 검색하기" />
        </View>
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
