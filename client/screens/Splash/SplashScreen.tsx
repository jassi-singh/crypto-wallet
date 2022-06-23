import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Helpers from "../../utils/helper";
import { ENCRYPTED_WALLET_KEY } from "../../utils/constants";

const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const wallets = useSelector((state: RootState) => state.ethers.wallets);

  useEffect(() => {
    setTimeout(function () {
      checkWallet();
    }, 2000);
  }, []);

  const checkWallet = async () => {
    if (wallets.length !== 0) navigation.replace("Home");
    else {
      const encryptedWallet = await Helpers.getData(ENCRYPTED_WALLET_KEY);
      if (encryptedWallet != null) {
        navigation.replace("Login", { encryptedWalletJson: encryptedWallet });
      } else navigation.replace("Startup");
    }
  };
  return (
    <View style={styles.splash}>
      <Text style={styles.text}>MetaMask Mobile</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: Colors.white,
    fontWeight: "bold",
  },
});
