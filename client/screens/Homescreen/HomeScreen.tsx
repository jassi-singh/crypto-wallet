import { StyleSheet, View } from "react-native";
import React from "react";
import TopLayout from "./components/TopLayout";
import BottomLayout from "./components/BottomLayout";

const HomeScreen = () => {
  return (
    <View style={styles.screen}>
      <TopLayout />
      <BottomLayout />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    display: "flex",
    backgroundColor: "white",
  },
});
