import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "../utils/colors";

const BottomButtons = (props: { children: ReactNode }) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default BottomButtons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
});
