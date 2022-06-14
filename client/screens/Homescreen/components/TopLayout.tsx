import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import Amount from "./Amount";
import { Colors } from "../../../constants/colors";
import TabButtons from "./TabButtons";

const TopLayout = () => {
  return (
    <View style={styles.container}>
      <Header address="0xdD2FD4581271e230360230F9337D5c0430Bf44C0" />
      <Amount />
      <TabButtons />
    </View>
  );
};

export default TopLayout;

const styles = StyleSheet.create({
  container: {
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
  },
});
