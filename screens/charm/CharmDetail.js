import {
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
import BoardContent from "../../components/BoardContent";
import key from "../../lib/key.json";
import axios from "axios";
import { getValue } from "../../functions/secureStore";
import { useDispatch, useSelector } from "react-redux";
import { setCharmById } from "../../redux/reducers/charmsSlice";
import colors from "../../lib/colors.json";
import { setCharm } from "../../redux/reducers/charmSlice";
import Comment from "../../components/Comment";
import { UserContext } from "../../context/user";
import CharmContent from "../../components/CharmContent";

const CharmDetail = ({ navigation, route }) => {
  const [author, setAuthor] = useState({});
  const [comment, setComment] = useState("");
  const { userInfo } = useContext(UserContext);
  const charm = useSelector((state) => state.charm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (charm.authorId && author !== {}) {
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const authorResponse = await axios.get(
          `${key.API}/user/${charm.authorId}/`,
          {
            headers,
          }
        );
        setAuthor(authorResponse.data);
      })();
    }
    console.log(charm?.title);
  }, [charm]);

  const onCommentSubmit = async () => {
    try {
      const commentObj = {
        creatorId: userInfo?.id,
        comment: comment,
        createdAt: new Date(),
      };
      dispatch(setCharm({ comments: [...charm.comments, commentObj] }));
      const response = await axios.put(`${key.API}/charm/${charm.id}/`, {
        comments: [...charm.comments, commentObj],
      });
      dispatch(setCharmById(response.data));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
                  <Text style={styles.title}>매력어필</Text>
                </View>
              </View>
              <View style={styles.inner}>
                <CharmContent
                  author={author}
                  fullVisible={!charm?.isAnonymous}
                />
              </View>
              <View style={styles.commentsContainer}>
                {charm?.comments?.map((item, i) => (
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
            />
            <TouchableOpacity onPress={onCommentSubmit}>
              <Feather name="send" size={24} color={colors.pink} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CharmDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInputContainer: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
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
});