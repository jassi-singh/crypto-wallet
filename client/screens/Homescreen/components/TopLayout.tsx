import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./Header";
import Amount from "./Amount";
import { Colors } from "../../../constants/colors";
import TabButtons from "./TabButtons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tab } from "../../../utils/enums";

const TopLayout = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  return (
    <View style={styles.container}>
      <Header />

      {activeTab != Tab.accounts &&
        activeTab != Tab.networks &&
        activeTab != Tab.transfer && (
          <View>
            <Amount />
            <TabButtons />
          </View>
        )}
    </View>
  );
};

export default TopLayout;

const styles = StyleSheet.create({
  container: {
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
  },
});
