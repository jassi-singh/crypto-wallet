import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/colors";
import MyInputField from "../../components/MyInputField";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Helpers from "../../utils/helper";
import { ACCOUNTS_LENGTH, ENCRYPTED_WALLET_KEY } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";

const EncryptWallet = () => {
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);
  const wallets = useSelector((state: RootState) => state.ethers.wallets);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const continueToWallet = async () => {
    if (password === confirmPassword) {
      console.log("Passwords matches 👏");
      const encryptedWallet = await wallets[0].encrypt(password);
      Helpers.storeData(ENCRYPTED_WALLET_KEY, encryptedWallet).then(
        async () => {
          await Helpers.storeData(ACCOUNTS_LENGTH, wallets.length.toString());
          navigation.navigate("Home");
        }
      );
    } else {
      console.log("Passwords doesn't match 👎");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Protect Your Wallet</Text>
      <MyInputField
        secureTextEntry={showPassword}
        label="Password"
        value={password}
        onChangeText={onChangePassword}
        iconName={showPassword ? "visibility-off" : "visibility"}
        onIconPress={() => setShowPassword(!showPassword)}
      />
      <View style={{ margin: 10 }} />
      <MyInputField
        secureTextEntry={showConfirmPassword}
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        iconName={showConfirmPassword ? "visibility-off" : "visibility"}
        onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
      />
      <Button
        textStyle={styles.buttonText}
        buttonStyles={styles.button}
        title={"Continue To Wallet"}
        onPress={() => continueToWallet()}
      />
    </SafeAreaView>
  );
};

export default EncryptWallet;

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
