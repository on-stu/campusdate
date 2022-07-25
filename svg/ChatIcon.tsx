import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import Svg, { Mask, Path } from "react-native-svg";

const ChatIcon = () => {
  const colorMode = useColorScheme();
  const color = colorMode === "light" ? "#4A4A4A" : "#FFFFFF";
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Mask id="path-1-inside-1_397_16348" fill="white">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.8831 19.8645C27.5929 17.862 30 14.6371 30 11C30 4.92487 23.2843 0 15 0C6.71573 0 0 4.92487 0 11C0 17.0751 6.71573 22 15 22C15.5985 22 16.1889 21.9743 16.7691 21.9243L16 30L23.8831 19.8645Z"
        />
      </Mask>
      <Path
        d="M23.8831 19.8645L22.9331 18.1046L22.5628 18.3045L22.3044 18.6366L23.8831 19.8645ZM16.7691 21.9243L18.7601 22.1139L18.9875 19.7257L16.5974 19.9317L16.7691 21.9243ZM16 30L14.009 29.8104L13.3571 36.6557L17.5787 31.2279L16 30ZM28 11C28 13.6808 26.2174 16.3317 22.9331 18.1046L24.8332 21.6245C28.9683 19.3923 32 15.5935 32 11H28ZM15 2C18.7616 2 22.0869 3.12087 24.4239 4.83464C26.762 6.54927 28 8.75265 28 11H32C32 7.17222 29.8801 3.8756 26.7893 1.60902C23.6974 -0.658435 19.5227 -2 15 -2V2ZM2 11C2 8.75265 3.23799 6.54927 5.57613 4.83464C7.91308 3.12087 11.2384 2 15 2V-2C10.4773 -2 6.30265 -0.658435 3.21067 1.60902C0.119878 3.8756 -2 7.17222 -2 11H2ZM15 20C11.2384 20 7.91308 18.8791 5.57613 17.1654C3.23799 15.4507 2 13.2474 2 11H-2C-2 14.8278 0.119878 18.1244 3.21067 20.391C6.30265 22.6584 10.4773 24 15 24V20ZM16.5974 19.9317C16.0744 19.9768 15.5413 20 15 20V24C15.6558 24 16.3034 23.9718 16.9408 23.9169L16.5974 19.9317ZM17.991 30.1896L18.7601 22.1139L14.7781 21.7347L14.009 29.8104L17.991 30.1896ZM22.3044 18.6366L14.4213 28.7721L17.5787 31.2279L25.4619 21.0924L22.3044 18.6366Z"
        fill={color}
        mask="url(#path-1-inside-1_397_16348)"
      />
    </Svg>
  );
};

export default ChatIcon;

const styles = StyleSheet.create({});
