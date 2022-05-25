import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import TitleImg from "../../img/title.svg";
import SmallProfile from "../../components/SmallProfile";
import colors from "../../lib/colors.json";
import getWidthByPercent from "../../functions/getWidthByPercent";
import MatchingIcon from "../../img/love.svg";
import FindingIcon from "../../img/love2.svg";
import { TouchableOpacity } from "react-native";
import FaqIcon from "../../img/faq.svg";
import posts from "../../lib/posts.json";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/reducers/counterSlice";
import { deleteItem } from "../../functions/secureStore";

const Header = ({ university, photoUrl, navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <TitleImg />
        <Text style={styles.leftText}>{university}</Text>
      </View>
      <View>
        <SmallProfile
          uri={photoUrl}
          onPress={() =>
            Alert.alert("알림", "로그아웃 하시겠습니까?", [
              {
                text: "아니오",
                style: "cancel",
              },
              {
                text: "예",
                onPress: () =>
                  deleteItem("token").then(() => {
                    navigation.reset({
                      routes: [{ name: "Login" }],
                    });
                  }),
              },
            ])
          }
        />
      </View>
    </View>
  );
};

const Banner = ({ title, texts, svg, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.banner}>
        <View>
          <Text style={styles.bannerTitle}>{title}</Text>
          {texts?.map((text, key) => (
            <Text style={styles.bannerSubtitle} key={key}>
              {text}
            </Text>
          ))}
        </View>
        <View style={styles.bannerBottom}>{svg}</View>
      </View>
    </TouchableOpacity>
  );
};

const LongBanner = ({ title, items }) => {
  return (
    <View style={styles.longBanner}>
      <TouchableOpacity>
        <View style={styles.innerLongBanner}>
          <Text style={styles.bannerTitle}>{title}</Text>
          <Text>더보기</Text>
        </View>
      </TouchableOpacity>
      {items?.map((item, key) => (
        <TouchableOpacity key={key}>
          <View style={{ ...styles.innerLongBanner, marginVertical: 4 }}>
            <Text>{item.title}</Text>
            <Text>{item.createdAt}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Home = ({ stackNavigation, navigation }) => {
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(stackNavigation);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          university="부산대학교"
          photoUrl={userInfo?.photoUrl}
          navigation={stackNavigation}
        />
        <View style={styles.innerContainer}>
          <View style={styles.bannerContainer}>
            <Banner
              title="매칭하기"
              texts={["지금 이 순간,", "널 사랑하고 싶다."]}
              svg={<MatchingIcon height={100} />}
              onPress={() => dispatch(increment())}
            />
            <Banner
              title="내 연인 찾기"
              texts={["용기있는 자가", "미인을 얻는다."]}
              svg={<FindingIcon height={80} />}
              onPress={() => deleteItem("token")}
            />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity>
            <View
              style={{
                ...styles.longBanner,
                height: 80,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 16,
              }}
            >
              <Text style={styles.bannerTitle}>문의하기</Text>
              <FaqIcon width={120} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <LongBanner title="공지사항" items={posts.slice(0, 3)} />
        </View>
        <View style={styles.innerContainer}>
          <LongBanner title="후기" items={posts.slice(0, 4)} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    width: Dimensions.get("screen").width,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  headerLeft: {
    display: "flex",
    alignItems: "flex-end",
  },
  leftText: {
    marginTop: 4,
    color: colors.darkgray,
  },
  innerContainer: {
    width: getWidthByPercent(85),
    alignSelf: "center",
    margin: 10,
  },
  bannerContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  banner: {
    display: "flex",
    width: getWidthByPercent(40),
    borderColor: colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    height: 200,
    justifyContent: "space-between",
  },
  bannerTitle: {
    fontFamily: "WaterMelon",
    fontSize: 24,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: colors.darkgray,
  },
  bannerBottom: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  longBanner: {
    width: "100%",
    borderColor: colors.gray,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  innerLongBanner: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
