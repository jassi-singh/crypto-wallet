import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import Button from "../../components/Button";
import MyInputField from "../../components/MyInputField";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../utils/interfaces";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import { addWallet } from "../../redux/slices/etherSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Helpers from "../../utils/helper";
import { ACCOUNTS_LENGTH } from "../../utils/constants";

const LoginScreen = () => {
  const [password, onChangePassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Login">>();
  const unlockWallet = async () => {
    const encryptedWalletJson = route.params.encryptedWalletJson;
    const mainWallet = await ethers.Wallet.fromEncryptedJson(
      encryptedWalletJson,
      password
    );
    dispatch(addWallet(mainWallet));
    const accountsLength = await Helpers.getData(ACCOUNTS_LENGTH);
    console.log(accountsLength);
    for (var i = 1; i < parseInt(accountsLength!); i++) {
      const seedPhrase = mainWallet.mnemonic.phrase;
      const derivePath = mainWallet.mnemonic.path.slice(0, -1);
      const hdNode = ethers.utils.HDNode.fromMnemonic(seedPhrase).derivePath(
        derivePath + i.toString()
      );
      console.log(hdNode);
      const wallet = new ethers.Wallet(hdNode.privateKey);
      dispatch(addWallet(wallet));
    }
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>
        Enter Your Password To{"\n"}Unlock Your Wallet
      </Text>
      <MyInputField
        secureTextEntry={showPassword}
        label="Password"
        value={password}
        onChangeText={onChangePassword}
        iconName={showPassword ? "visibility-off" : "visibility"}
        onIconPress={() => setShowPassword(!showPassword)}
      />
      <Button
        textStyle={styles.buttonText}
        buttonStyles={styles.button}
        title={"Unlock Wallet"}
        onPress={() => unlockWallet()}
        disabled={password.length === 0}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: Colors.gray,
  },
  heading: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    marginTop: "auto",
  },
  buttonText: {
    color: Colors.white,
  },
});
