import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

const PopUp = ({ children, visible, setVisible }) => {
  return (
    <>
      {visible && (
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.container}>{children}</View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
};

export default PopUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.3)",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
