import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { addWallet } from "../../redux/slices/etherSlice";
import { ethers } from "ethers";

const Startup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const createNewWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    console.log("Mnemonic 🔐 : ", wallet.mnemonic.phrase.trim());
    dispatch(addWallet(wallet));
    navigation.navigate("CreateAccount",{seedPhrase:wallet.mnemonic.phrase.trim()});
  };

  return (
    <View style={styles.center}>
      <Text style={styles.text}>Metamask Mobile</Text>
      <View style={{ marginTop: 50 }} />
      <Button
        title="Create Account"
        buttonStyles={styles.button}
        textStyle={styles.buttonText}
        onPress={() => createNewWallet()}
      />
      <Button
        title="Import Account"
        buttonStyles={styles.otherButton}
        textStyle={styles.otherButtonText}
        onPress={() => {
          //   navigation.navigate("CreateAccount");
        }}
      />
    </View>
  );
};

export default Startup;

const styles = StyleSheet.create({
  center: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  text: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "bold",
  },
  otherButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  otherButton: {
    borderWidth: 0.2,
    borderColor: Colors.primary,
    shadowColor: Colors.white,
    width: 250,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
  },
  button: {
    backgroundColor: Colors.primary,
    width: 250,
  },
});
