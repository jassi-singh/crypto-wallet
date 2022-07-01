import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TabButton from "../../../components/TabButton";
import { Tab } from "../../../utils/enums";
import { Colors } from "../../../utils/colors";
import ListItem from "../../../components/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Assets from "./Assets";
import History from "./History";

const TabView = () => {
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  const showList = (tab: Tab) => {
    switch (tab) {
      case Tab.assets:
        return <Assets />;
      case Tab.history:
        return <History />;
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.tabButtons, styles.row]}>
        <TabButton tab={Tab.assets} />
        <TabButton tab={Tab.history} />
      </View>
      <View style={styles.tabView}>{showList(activeTab)}</View>
    </View>
  );
};

export default TabView;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "70%",
  },
  icon: {
    marginRight: 30,
    height: 35,
    width: 35,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primaryDark,
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    color: Colors.primaryLight,
  },
  status: {
    color: Colors.white,
    padding: 2,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
  tabButtons: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
  },
  tabView: {
    // paddingBottom: 300,
    backgroundColor: Colors.white,
  },
});
