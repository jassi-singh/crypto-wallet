import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImportedToken, RootStackParamList } from "../../../utils/interfaces";
import { useNavigation } from "@react-navigation/native";
import ScreenTemplate from "../../../components/ScreenTemplate";
import MyInputField from "../../../components/MyInputField";
import BottomButtons from "../../../components/BottomButtons";
import Button from "../../../components/Button";
import { Colors } from "../../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { ethers, Signer } from "ethers";
import { ERC20_ABI, IMPORTED_TOKENS } from "../../../utils/constants";
import Helpers from "../../../utils/helper";
import { addNewToken } from "../../../redux/slices/etherSlice";

const ImportToken = () => {
  const [tokenAddress, setTokenAddress] = useState<string>(
    "0x326c977e6efc84e512bb9c30f76e30c160ed06fb"
  );
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: RootState) => state);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const importNewToken = async () => {
    const importedToken: ImportedToken = {
      tokenAddress: tokenAddress,
      symbol: tokenSymbol,
      account: state.ethers.activeAccount?.address!,
      provider: state.ethers.provider,
    };
    const tokenContract = new ethers.Contract(
      importedToken.tokenAddress,
      ERC20_ABI,
      importedToken.provider
    );
    await tokenContract
      .deployed()
      .then(() => {
        dispatch(addNewToken(importedToken));
        navigation.goBack();
      })
      .catch(() => {
        Helpers.showAlertToast("Bad Address");
      });
  };
  return (
    <ScreenTemplate>
      <ScrollView style={styles.container}>
        <MyInputField
          label={"Token Contract Address"}
          value={tokenAddress}
          onChangeText={setTokenAddress}
          placeholder={"Token Contract Address"}
        />
        <MyInputField
          label={"Token Symbol"}
          value={tokenSymbol}
          onChangeText={setTokenSymbol}
          placeholder={"ETH"}
        />
        <MyInputField
          label={"Token Decimal"}
          value={tokenDecimal}
          onChangeText={setTokenDecimal}
          placeholder={"18"}
        />
        {/* <View>
          <Text style={styles.label}>Transaction Fees</Text>
          <View>

          </View>
        </View> */}
      </ScrollView>
      <BottomButtons>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Back"
          buttonStyles={styles.buttonSecondary}
          textStyle={styles.textSecondary}
        />
        <Button
          onPress={() => {
            importNewToken();
          }}
          title="Import"
          buttonStyles={styles.buttonPrimary}
          textStyle={styles.textPrimary}
        />
      </BottomButtons>
    </ScreenTemplate>
  );
};

export default ImportToken;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 30, backgroundColor: Colors.white },
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    flexGrow: 1,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.primary,
  },
});
