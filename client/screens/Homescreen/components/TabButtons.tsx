import { StyleSheet, View } from "react-native";
import React from "react";
import { Tab } from "../../../utils/enums";
import TabButton from "../../../components/TabButton";

const TabButtons = () => {
  const styles = StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });

  return (
    <View style={styles.row}>
      <TabButton tab={Tab.assets} />
      <TabButton tab={Tab.history} />
    </View>
  );
};

export default TabButtons;
