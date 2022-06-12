import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Amount = () => {
  return (
    <View style={styles.balance}>
      <Text style={styles.amount}>1000</Text>
      <Text style={styles.tokenName}>MATIC</Text>
    </View>
  );
};

export default Amount;

const styles = StyleSheet.create({
  balance: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  amount: {
    fontSize: 45,
    color: "white",
  },
  tokenName: {
    paddingLeft: 10,
    fontSize: 25,
    color: "white",
    fontWeight: "500",
  },
});
