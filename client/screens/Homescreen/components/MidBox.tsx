import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MidBox = () => {
  return (
    <View style={styles.box}>
      <Text>hi</Text>
      <Text>hi</Text>
      <Text>hi</Text>
      <Text>hi</Text>
    </View>
  );
};

export default MidBox;

const styles = StyleSheet.create({
  box: {
    height: 100,
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-30%",
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { height: 5, width: 5 },
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
