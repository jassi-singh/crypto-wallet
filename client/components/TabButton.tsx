import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../utils/colors";
import { Tab } from "../utils/enums";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeActiveTab } from "../redux/slices/tabSlice";
import { TabButtonProps } from "../utils/interfaces";


const TabButton = (props: TabButtonProps) => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  const styles = StyleSheet.create({
    tabText: {
      fontSize: 18,
      color: Colors.white,
      fontWeight: "500",
    },
    tab: {
      padding: 10,
      opacity: activeTab === props.tab ? 1 : 0.7,
      borderBottomWidth: 4,
      borderBottomColor:
        activeTab === props.tab ? Colors.secondary : Colors.primary,
    },
  });

  const changeTab = (tab: Tab) => dispatch(changeActiveTab(tab));

  return (
    <TouchableOpacity onPress={() => changeTab(props.tab)}>
      <View style={styles.tab}>
        <Text style={styles.tabText}>{props.tab}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;
