import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ethers } from "ethers";
import { Colors } from "../../../utils/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Balance = () => {
  const ethersState = useSelector((state: RootState) => state.ethers);

  return (
    <View style={styles.balance}>
      <Text style={styles.amountUsd}>1000 USD</Text>
      <Text style={styles.amountToken}>
        {ethers.utils.formatEther(
          ethersState.balanceOf.get(ethersState.activeAccount?.address!) ?? "0"
        )}{" "}
        ETH
      </Text>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  balance: {
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
  },
  amountUsd: {
    fontSize: 32,
    color: Colors.white,
    paddingBottom: 4,
  },
  amountToken: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: "600",
    opacity: 0.8,
  },
});
