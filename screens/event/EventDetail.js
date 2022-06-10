import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import key from "../../lib/key.json";
import axios from "axios";
import { getValue } from "../../functions/secureStore";
import { useDispatch, useSelector } from "react-redux";
import { setEventById, setEvents } from "../../redux/reducers/eventsSlice";
import colors from "../../lib/colors.json";
import { setEvent } from "../../redux/reducers/eventSlice";
import Comment from "../../components/Comment";
import { UserContext } from "../../context/user";
import EventContent from "../../components/EventContent";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

const EventDetail = ({ navigation, route }) => {
  const [author, setAuthor] = useState({});
  const [comment, setComment] = useState("");
  const [dropMenuVisible, setDropMenuVisible] = useState(false);

  const { userInfo } = useContext(UserContext);
  const event = useSelector((state) => state.event);
  const events = useSelector((state) => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    if (event.authorId && author !== {}) {
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const authorResponse = await axios.get(
          `${key.API}/user/${event.authorId}/`,
          {
            headers,
          }
        );
        setAuthor(authorResponse.data);
      })();
    }
  }, [event]);

  const onCommentSubmit = async () => {
    try {
      const commentObj = {
        creatorId: userInfo?.id,
        comment: comment,
        createdAt: new Date(),
      };
      dispatch(setEvent({ comments: [...event.comments, commentObj] }));
      const response = await axios.put(`${key.API}/event/${event.id}/`, {
        comments: [...event.comments, commentObj],
      });
      dispatch(setEventById(response.data));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {
    const newState = events.filter((elm) => elm.id !== event.id);
    dispatch(setEvents(newState));
    try {
      const response = await axios.delete(`${key.API}/event/${event.id}/`);
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
                  <Text style={styles.title}>이벤트</Text>
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
                <EventContent
                  author={author}
                  title={event?.title}
                  content={event?.content}
                  createdAt={event?.createdAt}
                  thumbsNum={event?.thumbs?.length}
                  commentsNum={event?.comments?.length}
                />
              </View>
              <View style={styles.commentsContainer}>
                {event?.comments?.map((item, i) => (
                  <Comment
                    comment={item.comment}
                    key={i}
                    createdAt={item.createdAt}
                    creatorId={item.creatorId}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <View style={styles.footer}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="댓글을 입력해주세요"
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EventDetail;

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
