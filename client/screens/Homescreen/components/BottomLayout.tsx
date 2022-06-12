import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomLayout = () => {
  return (
    <View style={styles.container}>
      <Text>BottomLayout</Text>
    </View>
  );
};

export default BottomLayout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 5,
  },
});
