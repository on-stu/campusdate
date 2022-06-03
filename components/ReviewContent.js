import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import { getTimeString } from "../functions/getTimeString";
import { useDispatch, useSelector } from "react-redux";
import { setReview } from "../redux/reducers/reviewSlice";
import key from "../lib/key.json";
import axios from "axios";
import { setReviewById } from "../redux/reducers/reviewsSlice";
import { UserContext } from "../context/user";

const ReviewContent = ({ author, fullVisible }) => {
  const [timeString, setTimeString] = useState("");
  const { userInfo } = useContext(UserContext);
  const review = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const onThumbPress = async () => {
    let thumbs = review.thumbs;
    try {
      if (thumbs?.includes(userInfo.id)) {
        dispatch(
          setReview({
            thumbs: thumbs.filter((elm) => elm !== userInfo.id),
          })
        );
        const response = await axios.put(`${key.API}/review/${review.id}/`, {
          thumbs: thumbs.filter((elm) => elm !== userInfo.id),
        });
        dispatch(setReviewById(response.data));
      } else {
        dispatch(
          setReview({
            thumbs: [...thumbs, userInfo?.id],
          })
        );
        const response = await axios.put(`${key.API}/review/${review.id}/`, {
          thumbs: [...thumbs, userInfo?.id],
        });
        dispatch(setReviewById(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeString(getTimeString(review.createdAt));
  }, [review]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <SmallProfileCard
          nickname={author?.nickname}
          photoUrl={author?.photoUrl}
          fullVisible={fullVisible}
        />
        <Text style={styles.time}>{timeString}</Text>
      </View>
      <View style={styles.inner}>
        <Text style={styles.title}>{review?.title}</Text>
        <Text>{review?.content}</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={onThumbPress}>
          <View
            style={
              review?.thumbs?.includes(userInfo?.id)
                ? styles.miniButton
                : styles.miniButtonDisabled
            }
          >
            <Feather
              name="thumbs-up"
              size={16}
              color={review?.thumbs?.includes(userInfo?.id) ? "white" : "white"}
            />
            <Text style={styles.buttonText}>좋아요</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomInfo}>
          <Feather name="thumbs-up" size={16} color={colors.pink} />
          <Text style={styles.bottomText}>{review?.thumbs?.length}</Text>
          <Feather
            style={styles.bottomElement}
            name="message-circle"
            size={16}
            color={colors.purple}
          />
          <Text style={styles.bottomText}>{review?.comments?.length}</Text>
        </View>
      </View>
      <Hr />
    </View>
  );
};

export default ReviewContent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  top: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  time: {
    color: colors.darkgray,
  },
  inner: {
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bottomElement: {
    marginLeft: 4,
  },
  bottomText: {
    marginLeft: 4,
    color: colors.darkgray,
  },
  bottomInfo: {
    flexDirection: "row",
  },
  miniButton: {
    flexDirection: "row",
    backgroundColor: colors.pink,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  miniButtonDisabled: {
    flexDirection: "row",
    backgroundColor: colors.darkgray,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    marginLeft: 4,
    color: "#fff",
    fontWeight: "700",
  },
});
