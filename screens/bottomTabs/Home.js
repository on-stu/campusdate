import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import TitleImg from "../../img/title.svg";
import SmallProfile from "../../components/SmallProfile";
import colors from "../../lib/colors.json";
import getWidthByPercent from "../../functions/getWidthByPercent";
import MatchingIcon from "../../img/love.svg";
import FindingIcon from "../../img/love2.svg";
import EventIcon from "../../img/event.svg";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import key from "../../lib/key.json";
import { getTimeString } from "../../functions/getTimeString";
import { setNotices } from "../../redux/reducers/noticesSlice";
import { setNotice } from "../../redux/reducers/noticeSlice";
import SocketContext from "../../context/socket";
import { UserContext } from "../../context/user";
import { setCharms } from "../../redux/reducers/charmsSlice";
import { setCharm } from "../../redux/reducers/charmSlice";
import { setReview } from "../../redux/reducers/reviewSlice";
import { setReviews } from "../../redux/reducers/reviewsSlice";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";

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
          onPress={() => navigation.navigate("MyProfile")}
          fullVisible
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

const LongBanner = ({
  title,
  items,
  onPress,
  navigation,
  dispatch,
  reducerFunction,
  detailPathname,
}) => {
  return (
    <View style={styles.longBanner}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.innerLongBanner}>
          <Text style={styles.bannerTitle}>{title}</Text>
          <Text>더보기</Text>
        </View>
      </TouchableOpacity>
      {items?.map((item, key) => {
        const timeString = getTimeString(item.createdAt);
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              reducerFunction(item);
              navigation.navigate(detailPathname);
            }}
          >
            <View style={{ ...styles.innerLongBanner, marginVertical: 4 }}>
              <Text>{item.title}</Text>
              <Text style={styles.time}>{timeString}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Home = ({ stackNavigation }) => {
  const { userInfo, setUserChatList, userChatList } = useContext(UserContext);
  const notices = useSelector((state) => state.notices);
  const charms = useSelector((state) => state.charms);
  const reviews = useSelector((state) => state.reviews);
  const events = useSelector((state) => state.events);

  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  useEffect(() => {
    (async () => {
      if (notices?.length === 0) {
        const response = await axios.get(`${key.API}/notice/`);
        dispatch(setNotices(response.data));
      }
      if (charms?.length === 0) {
        const response = await axios.get(`${key.API}/charm/`);
        dispatch(setCharms(response.data));
      }
      if (reviews?.length === 0) {
        const response = await axios.get(`${key.API}/review/`);
        dispatch(setReviews(response.data));
      }
    })();
    socket.on("receiveMessage", (msg) => {
      const newChatList = userChatList?.map((chatRoom) => {
        if (chatRoom.id === msg.chatRoomId) {
          return { ...chatRoom, chats: [...chatRoom.chats, msg] };
        } else {
          return chatRoom;
        }
      });
      setUserChatList(newChatList);
    });
    return () => socket.off("receiveMessage");
  }, []);

  return (
    <SafeAreaView style={SafeAreaAndroid.AndroidSafeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header
          university={userInfo?.university}
          photoUrl={userInfo?.photoUrl}
          navigation={stackNavigation}
        />
        <View style={styles.innerContainer}>
          <View style={styles.bannerContainer}>
            <Banner
              title="매칭하기"
              texts={["지금 이 순간,", "널 사랑하고 싶다."]}
              svg={<MatchingIcon height={100} />}
              onPress={() => stackNavigation.navigate("MatchingLoading")}
            />
            <Banner
              title="내 연인 찾기"
              texts={
                userInfo?.sex === "male"
                  ? ["용기있는 자가", "미인을 얻는다."]
                  : ["용기있는 자가", "미남을 얻는다."]
              }
              svg={<FindingIcon height={80} />}
              onPress={() => stackNavigation.navigate("FindMyLove")}
            />
          </View>
        </View>
        <View style={styles.innerContainer}>
          <TouchableOpacity onPress={() => stackNavigation.navigate("Event")}>
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
              <View>
                <Text style={styles.bannerTitle}>이벤트</Text>
                <Text style={styles.bannerSubtitle}>
                  너와 함께하고픈 내 마음
                </Text>
              </View>
              <EventIcon width={100} height={80} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.innerContainer}>
          <LongBanner
            onPress={() => stackNavigation.navigate("Charm")}
            navigation={stackNavigation}
            title="매력어필"
            items={charms.slice(0, 3)}
            reducerFunction={(item) => dispatch(setCharm(item))}
            detailPathname="CharmDetail"
          />
        </View>
        <View style={styles.innerContainer}>
          <LongBanner
            onPress={() => stackNavigation.navigate("Review")}
            navigation={stackNavigation}
            title="후기"
            items={reviews.slice(0, 3)}
            reducerFunction={(item) => dispatch(setReview(item))}
            detailPathname="ReviewDetail"
          />
        </View>
        <View style={styles.innerContainer}>
          <LongBanner
            title="공지사항"
            items={notices.slice(0, 3)}
            navigation={stackNavigation}
            onPress={() => stackNavigation.navigate("Notice")}
            reducerFunction={(item) => dispatch(setNotice(item))}
            detailPathname="NoticeDetail"
          />
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
  time: {
    color: colors.darkgray,
  },
});
