import { Dimensions } from "react-native";

export default function getWidthByPercent(percent) {
  const width = Dimensions.get("screen").width;
  return (width * percent) / 100;
}
