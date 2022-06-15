import {
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import key from "../../lib/key.json";
import axios from "axios";
import { getValue } from "../../functions/secureStore";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../lib/colors.json";
import Comment from "../../components/Comment";
import { setReport } from "../../redux/reducers/reportSlice";
import { setReports, setReportsById } from "../../redux/reducers/reportsSlice";
import { UserContext } from "../../context/user";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import FaqContent from "../../components/FaqContent";

const ReportDetail = ({ navigation }) => {
  const [author, setAuthor] = useState({});
  const [comment, setComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const [dropMenuVisible, setDropMenuVisible] = useState(false);

  const report = useSelector((state) => state.report);
  const reports = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    if (report.authorId && author !== {}) {
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const authorResponse = await axios.get(
          `${key.API}/user/${report.authorId}/`,
          {
            headers,
          }
        );
        setAuthor(authorResponse.data);
      })();
    }
  }, [report]);

  const onCommentSubmit = async () => {
    try {
      const commentObj = {
        creatorId: userInfo?.id,
        answer: comment,
        createdAt: new Date(),
      };
      dispatch(setReport({ answers: [...report.answers, commentObj] }));
      const response = await axios.put(`${key.API}/report/${report.id}/`, {
        answers: [...report.answers, commentObj],
        done: true,
      });
      dispatch(setReport(response.data));
      dispatch(setReportsById(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    const newState = reports.filter((elm) => elm.id !== report.id);
    dispatch(setReports(newState));
    try {
      const response = await axios.delete(`${key.API}/report/${report.id}/`);
      if (response.status === 204) {
        navigation.pop();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Feather name="chevron-left" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>신고내역</Text>
                </View>
                <View style={{ position: "relative" }}>
                  <TouchableOpacity
                    onPress={() =>
                      author.id === userInfo.id &&
                      setDropMenuVisible((prev) => !prev)
                    }
                  >
                    <Feather name="more-vertical" size={24} color="black" />
                  </TouchableOpacity>
                  {dropMenuVisible && (
                    <View style={styles.dropMenuContainer}>
                      <TouchableOpacity onPress={onDelete}>
                        <View style={styles.dropMenu}>
                          <Text style={styles.deleteText}>삭제하기</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.inner}>
                <FaqContent author={author} />
              </View>
              <View style={styles.commentsContainer}>
                {report?.answers?.map((item, i) => (
                  <Comment
                    comment={item.answer}
                    key={i}
                    createdAt={item.createdAt}
                    creatorId={item.creatorId}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        {userInfo?.is_admin && (
          <View style={styles.footer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="답글을 입력해주세요"
                value={comment}
                onChangeText={setComment}
                onSubmitEditing={onCommentSubmit}
              />
              <TouchableOpacity
                onPress={onCommentSubmit}
                style={{ height: "100%", justifyContent: "center" }}
              >
                <Feather name="send" size={22} color={colors.pink} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    padding: 15,
  },
  textInputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    backgroundColor: colors.gray,
    borderColor: "transparent",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    width: "60%",
    marginHorizontal: 8,
  },
  header: {
    width: "100%",
    position: "relative",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    width: "100%",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  inner: {
    padding: 20,
    paddingBottom: 4,
  },
  commentsContainer: {
    paddingHorizontal: 20,
  },
  dropMenuContainer: {
    position: "absolute",
    top: 32,
    right: 0,
  },
  dropMenu: {
    backgroundColor: colors.gray,
    width: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
  },
  deleteText: {
    color: colors.red,
  },
});
