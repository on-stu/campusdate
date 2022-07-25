import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import React from "react";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import Road from "../../svg/Road";
import HuntingBuilding from "../../components/buildings/HuntingBuilding";
import ParkBuilding from "../../components/buildings/ParkBuilding";
import CafeBuilding from "../../components/buildings/CafeBuilding";
import colors from "../../lib/colors.json";

const NewHome = () => {
  const aspectRatio = 813 / 390;
  const theme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: theme === "light" ? colors.white : colors.lightblack,
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 600 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ position: "absolute", zIndex: 10 }}>
          <HuntingBuilding />
          <ParkBuilding />
          <CafeBuilding />
        </View>

        <Road />
        <Road />
        <Road />
        <Road />
      </ScrollView>
    </View>
  );
};

export default NewHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 1000,
  },
});
