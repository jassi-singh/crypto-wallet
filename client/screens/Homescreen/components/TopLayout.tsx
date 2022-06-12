import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome";
import MidBox from "./MidBox";
import ChainSelectButton from "./ChainSelectButton";
import Amount from "./Amount";

const TopLayout = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#06b5d4", "#3b82f6"]}
        style={styles.gradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      <SafeAreaView>
        <Header address="0xdD2FD4581271e230360230F9337D5c0430Bf44C0" />
        <Amount />
        <ChainSelectButton />
        <MidBox />
      </SafeAreaView>
    </View>
  );
};

export default TopLayout;

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
  container: {
    backgroundColor: "#afaffa",
    borderBottomStartRadius: 50,
    borderBottomEndRadius: 50,
    paddingHorizontal: 30,
    marginBottom: 100,
  },
});
