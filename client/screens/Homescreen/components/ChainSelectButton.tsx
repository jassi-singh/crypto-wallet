import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const ChainSelectButton = () => {
  return (
    <View style={styles.button}>
      <Icon name="circle" size={18} color="#fff" />
      <Text style={styles.chainText}>Polygon Testnet</Text>
      <Icon name="chevron-down" size={18} color="#fff" />
    </View>
  );
};

export default ChainSelectButton;

const styles = StyleSheet.create({
  chainText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 100,
    margin: 30,
    backfaceVisibility: "visible",
  },
});
