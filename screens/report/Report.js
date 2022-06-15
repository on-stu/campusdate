import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import colors from "../../lib/colors.json";
import { Feather } from "@expo/vector-icons";
import ListItemFaq from "../../components/ListItemFaq";
import { useDispatch, useSelector } from "react-redux";
import key from "../../lib/key.json";
import axios from "axios";
import { setReports } from "../../redux/reducers/reportsSlice";
import { setReport } from "../../redux/reducers/reportSlice";
import { UserContext } from "../../context/user";
import Header from "../../components/Header";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Report = ({ navigation }) => {
  const { userInfo } = useContext(UserContext);
  const reports = useSelector((state) => state.reports);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios.get(`${key.API}/faq/`).then((response) => {
      dispatch(setReports(response.data));
      wait(500).then(() => {
        setRefreshing(false);
      });
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${key.API}/report/`);
      dispatch(setReports(response.data));
    })();
  }, []);
  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <Header
        title="신고하기"
        onBackPress={() => navigation.pop()}
        onSearchPress={() => navigation.navigate("ReportSearch")}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.inner}>
          {reports.map((faq, i) => (
            <ListItemFaq
              fullVisible={!faq?.isSecret || userInfo?.is_admin ? true : false}
              authorId={faq?.authorId}
              createdAt={faq?.createdAt}
              title={faq?.title}
              key={i}
              done={faq?.done}
              onPress={() => {
                if (!faq?.isSecret || userInfo?.is_admin) {
                  dispatch(setReport(faq));
                  navigation.navigate("ReportDetail");
                }
              }}
            />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ReportPost");
        }}
      >
        <View style={styles.button}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.buttonText}>신고하기</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Report;

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
