import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getValue } from "../functions/secureStore";
import key from "../lib/key.json";
import SmallProfile from "./SmallProfile";
import SmallProfileCard from "./SmallProfileCard";
import axios from "axios";
import Hr from "./Hr";
import { getTimeString } from "../functions/getTimeString";

const Comment = ({ comment, createdAt, creatorId }) => {
  const [creator, setCreator] = useState({});

  useEffect(() => {
    if (creator === {} || !creator.photoUrl)
      (async () => {
        const token = await getValue("token");
        const headers = {
          Authorization: `Token ${token}`,
        };
        const response = await axios.get(`${key.API}/user/${creatorId}/`, {
          headers,
        });
        setCreator(response.data);
      })();
  }, [creator]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <SmallProfileCard
            photoUrl={creator?.photoUrl}
            nickname={creator?.nickname}
          />
          <Text>{getTimeString(createdAt)}</Text>
        </View>
        <Text>{comment}</Text>
      </View>
      <Hr />
    </>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    marginTop: 8,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
