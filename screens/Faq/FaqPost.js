import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import { useState } from "react";
import Hr from "../../components/Hr";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import MiniCheck from "../../components/MiniCheck";
import { setNotices } from "../../redux/reducers/noticesSlice";
import { setFaqs } from "../../redux/reducers/faqsSlice";

const FaqPost = ({ navigation }) => {
  const [canPost, setCanPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(true);
  const userInfo = useSelector((state) => state.user);
  const faqs = useSelector((state) => state.faqs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (title !== "" && content !== "") {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [title, content]);

  const onSubmit = async () => {
    const response = await axios.post(`${key.API}/faq/`, {
      title,
      content,
      isSecret,
      authorId: userInfo?.id,
      done: false,
      createdAt: new Date(),
    });
    if (response.status === 201) {
      console.log(response.data);
      dispatch(setFaqs([...faqs, response.data]));
      navigation.pop();
    } else {
      Alert.alert("경고", "예상치 못한 문제가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.inTouchable}>
            <View>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.pop()}>
                  <Feather
                    name="chevron-left"
                    size={24}
                    color={colors.darkgray}
                  />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>글쓰기</Text>
                <TouchableOpacity disabled={!canPost} onPress={onSubmit}>
                  <Feather
                    name="check"
                    size={24}
                    color={canPost ? colors.pink : colors.darkgray}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inner}>
                <TextInput
                  style={styles.title}
                  placeholder="제목을 입력해주세요."
                  value={title}
                  onChangeText={setTitle}
                />
                <Hr />
                <TextInput
                  multiline={true}
                  style={styles.content}
                  placeholder="내용을 입력해주세요"
                  value={content}
                  onChangeText={setContent}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                padding: 15,
              }}
            >
              <MiniCheck
                isChecked={isSecret}
                onPress={() => setIsSecret((prev) => !prev)}
                text="비밀글"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FaqPost;

const styles = StyleSheet.create({
  inTouchable: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: Dimensions.get("screen").height,
    justifyContent: "space-between",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  inner: {
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  title: {
    width: "100%",
    marginBottom: 10,
  },
  content: {
    width: "100%",
    marginTop: 10,
  },
});
