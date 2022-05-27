import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import colors from "../../lib/colors.json";
import NoticeIcon from "../../img/notice.svg";
import { Feather } from "@expo/vector-icons";
import SearchBar from "../../components/SearchBar";
import ListItem from "../../components/ListItem";
import { useSelector } from "react-redux";

const Notice = ({ navigation }) => {
  const now = new Date();
  const userInfo = useSelector((state) => state.user);
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
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
          />
          <ListItem
            author="관리자"
            thumbsNum={10}
            commentsNum={10}
            time={now}
            title="예시 공지사항"
            fullVisible
            last={true}
          />
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
