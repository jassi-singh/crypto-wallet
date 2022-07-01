import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Jazzicon from "react-native-jazzicon";
import { Colors } from "../../utils/colors";
import ListItem from "../../components/ListItem";
import BottomButtons from "../../components/BottomButtons";
import Button from "../../components/Button";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ethers } from "ethers";
import { changeActiveTab } from "../../redux/slices/tabSlice";
import { Tab } from "../../utils/enums";
import ScreenTemplate from "../../components/ScreenTemplate";

const SendConfirmation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "SendConfirmation">>();
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [gasPrice, setGasPrice] = useState<ethers.BigNumberish>();
  const sendTransaction = async () => {
    const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
      to: route.params.recieverAddress,
      value: ethers.utils.parseEther(route.params.amount),
      gasPrice: gasPrice,
    };
    console.log(tx);
    await state.ethers.activeAccount!.sendTransaction(tx!);
    dispatch(changeActiveTab(Tab.history));
    navigation.goBack();
  };

  const updateGasFee = async () => {
    const newGasPrice = await state.ethers.activeAccount!.getGasPrice();
    console.log(newGasPrice);
    setGasPrice(newGasPrice);
  };

  useEffect(() => {
    updateGasFee();
    const updateGasFeeTimer = setInterval(() => {
      updateGasFee();
    }, 30 * 1000);

    return () => {
      console.log("unmount");
      clearInterval(updateGasFeeTimer);
    };
  }, []);

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        <ListItem
          body={
            <View>
              <Text style={styles.label}>Confirm Send To</Text>
              <View style={styles.row}>
                <Jazzicon size={30} address={route.params.recieverAddress} />
                <Text style={styles.heading}>
                  {route.params.recieverAddress.substring(0, 6)}...
                  {route.params.recieverAddress.substring(37)}
                </Text>
              </View>
            </View>
          }
        />
        <ListItem
          body={
            <View style={[styles.row, styles.listItems]}>
              <Text style={styles.heading}>Network</Text>
              <Text style={styles.heading2}>Main Ethereum Network</Text>
            </View>
          }
        />
        <ListItem
          body={
            <View style={[styles.row, styles.listItems]}>
              <Text style={styles.heading}>Amount</Text>
              <View>
                <Text style={styles.heading2}>$ 39.29</Text>
                <Text style={styles.heading3}>{route.params.amount} ETH</Text>
              </View>
            </View>
          }
        />
        <ListItem
          body={
            <View style={[styles.row, styles.listItems]}>
              <Text style={styles.heading}>Gas Fee</Text>
              <View>
                <Text style={styles.heading2}>$ 39.29</Text>
                <Text style={styles.heading3}>
                  {ethers.utils.formatEther(
                    gasPrice ?? ethers.BigNumber.from(0)
                  )}{" "}
                  ETH
                </Text>
              </View>
            </View>
          }
        />
        <ListItem
          body={
            <View style={[styles.row, styles.listItems]}>
              <Text style={styles.heading}>Total</Text>
              <View>
                <Text style={styles.heading2}>$ 39.29</Text>
                <Text style={styles.heading3}>
                  {ethers.utils.formatEther(
                    ethers.utils
                      .parseEther(route.params.amount)
                      .add(gasPrice ?? ethers.BigNumber.from(0))
                  )}{" "}
                  ETH
                </Text>
              </View>
            </View>
          }
        />
        <BottomButtons>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            title="Cancel"
            buttonStyles={styles.buttonSecondary}
            textStyle={styles.textSecondary}
          />
          <Button
            onPress={() => sendTransaction()}
            title="Confirm"
            buttonStyles={styles.buttonPrimary}
            textStyle={styles.textPrimary}
          />
        </BottomButtons>
      </View>
    </ScreenTemplate>
  );
};

export default SendConfirmation;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 30,
    backgroundColor: Colors.white,
    height: "100%",
  },
  label: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  listItems: {
    justifyContent: "space-between",
  },
  heading: {
    paddingHorizontal: 10,
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
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
  heading2: {
    textAlign: "right",
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 15,
  },
  heading3: {
    color: Colors.primaryLight,
  },
});

// 0x750D55B9586Ad2AC1C2C8351F1136Db6B3aB45f1
