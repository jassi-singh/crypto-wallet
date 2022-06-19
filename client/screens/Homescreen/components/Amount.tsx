import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../../constants/colors";
import { getBalance } from "../../../redux/slices/etherSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { ethers } from "ethers";

const Amount = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    // dispatch(getBalance());
    // checkEthers();
  }, []);

  return (
    <View style={styles.balance}>
      <Text style={styles.amountUsd}>1000 USD</Text>
      <Text style={styles.amountToken}>1000 MATIC</Text>
    </View>
  );
};

export default Amount;

const styles = StyleSheet.create({
  balance: {
    paddingTop: 20,
    paddingBottom: 40,
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
