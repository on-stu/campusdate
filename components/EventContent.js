import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SmallProfileCard from "./SmallProfileCard";
import Hr from "./Hr";
import { Feather } from "@expo/vector-icons";
import colors from "../lib/colors.json";
import { getTimeString } from "../functions/getTimeString";
import { useDispatch, useSelector } from "react-redux";
import { setEvent } from "../redux/reducers/eventSlice";
import key from "../lib/key.json";
import axios from "axios";
import { setEventById } from "../redux/reducers/eventsSlice";
import { UserContext } from "../context/user";

const EventContent = ({ author, fullVisible }) => {
  const [timeString, setTimeString] = useState("");
  const { userInfo } = useContext(UserContext);
  const event = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const onThumbPress = async () => {
    let thumbs = event.thumbs;
    try {
      if (thumbs?.includes(userInfo.id)) {
        dispatch(
          setEvent({
            thumbs: thumbs.filter((elm) => elm !== userInfo.id),
          })
        );
        const response = await axios.put(`${key.API}/event/${event.id}/`, {
          thumbs: thumbs.filter((elm) => elm !== userInfo.id),
        });
        dispatch(setEventById(response.data));
      } else {
        dispatch(
          setEvent({
            thumbs: [...thumbs, userInfo?.id],
          })
        );
        const response = await axios.put(`${key.API}/event/${event.id}/`, {
          thumbs: [...thumbs, userInfo?.id],
        });
        dispatch(setEventById(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeString(getTimeString(event.createdAt));
  }, [event]);

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
        <Text style={styles.title}>{event?.title}</Text>
        <Text>{event?.content}</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={onThumbPress}>
          <View
            style={
              event?.thumbs?.includes(userInfo?.id)
                ? styles.miniButton
                : styles.miniButtonDisabled
            }
          >
            <Feather
              name="thumbs-up"
              size={16}
              color={event?.thumbs?.includes(userInfo?.id) ? "white" : "white"}
            />
            <Text style={styles.buttonText}>좋아요</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.bottomInfo}>
          <Feather name="thumbs-up" size={16} color={colors.pink} />
          <Text style={styles.bottomText}>{event?.thumbs?.length}</Text>
          <Feather
            style={styles.bottomElement}
            name="message-circle"
            size={16}
            color={colors.purple}
          />
          <Text style={styles.bottomText}>{event?.comments?.length}</Text>
        </View>
      </View>
      <Hr />
    </View>
  );
};

export default EventContent;

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
