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
} from "react-native";
import React, { useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "../../lib/colors.json";
import { useState } from "react";
import Hr from "../../components/Hr";

const NoticePost = ({ navigation }) => {
  const [canPost, setCanPost] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (title !== "" && content !== "") {
      setCanPost(true);
    } else {
      setCanPost(false);
    }
  }, [title, content]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.pop()}>
                <Feather
                  name="chevron-left"
                  size={24}
                  color={colors.darkgray}
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>글쓰기</Text>
              <TouchableOpacity disabled={!canPost}>
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
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NoticePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
