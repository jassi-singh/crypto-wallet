import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../utils/colors";
import MyInputField from "../../components/MyInputField";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Helpers from "../../utils/helper";
import { ACCOUNTS_LENGTH, ENCRYPTED_WALLET_KEY } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";
import { changeActiveAccount } from "../../redux/slices/etherSlice";
import IconButton from "../../components/IconButton";

const EncryptWallet = () => {
  const [password, onChangePassword] = React.useState("");
  const [confirmPassword, onChangeConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.ethers.wallets);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const continueToWallet = async () => {
    if (password === confirmPassword) {
      console.log("Passwords matches 👏");
      const encryptedWallet = await wallets[0].encrypt(password);
      dispatch(changeActiveAccount(wallets[0]));
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

  const visibilityIcon = (
    showPassword: boolean,
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <IconButton
      onPress={() => setShowPassword(!showPassword)}
      iconName={showPassword ? "visibility-off" : "visibility"}
      size={20}
      color={Colors.primary}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Protect Your Wallet</Text>
      <MyInputField
        secureTextEntry={showPassword}
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChangeText={onChangePassword}
        trailing={visibilityIcon(showPassword, setShowPassword)}
      />
      <View style={{ margin: 10 }} />
      <MyInputField
        secureTextEntry={showConfirmPassword}
        label="Confirm Password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        trailing={visibilityIcon(showConfirmPassword, setShowConfirmPassword)}
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
    backgroundColor: Colors.white,
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
