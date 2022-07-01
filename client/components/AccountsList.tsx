import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ListItem from "./ListItem";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ethers } from "ethers";
import { addWallet, changeActiveAccount } from "../redux/slices/etherSlice";
import Jazzicon from "react-native-jazzicon";
import { Colors } from "../utils/colors";
import ImportWalletDialog from "../dialogBoxes/ImportWalletDialog";

const AccountsList = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const ethersState = useSelector((state: RootState) => state.ethers);
  const addNewAccount = async () => {
    const mainWallet = ethersState.wallets[0];
    const seedPhrase = mainWallet.mnemonic.phrase;
    const derivePath = mainWallet.mnemonic.path.slice(0, -1);
    const hdNode = ethers.utils.HDNode.fromMnemonic(seedPhrase).derivePath(
      derivePath + ethersState.wallets.length
    );
    console.log(hdNode);
    const wallet = new ethers.Wallet(hdNode.privateKey);
    dispatch(addWallet(wallet));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ethersState.wallets}
        style={{ height: "75%" }}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              dispatch(changeActiveAccount(item));
            }}
            leading={
              <View style={styles.icon}>
                <Jazzicon size={30} address={item.address} />
              </View>
            }
            body={
              <View>
                <Text style={styles.title}>Account {index + 1}</Text>
                <Text style={styles.subtitle}>
                  {ethers.utils.formatEther(
                    ethersState.balanceOf.get(item.address) ??
                      ethers.BigNumber.from(0)
                  )}{" "}
                  ETH
                </Text>
              </View>
            }
            trailing={
              item.address === ethersState.activeAccount?.address ? (
                <View>
                  <Icon name="check-circle" size={24} color={Colors.primary} />
                </View>
              ) : undefined
            }
          />
        )}
      />
      <View style={{ marginBottom: 100 }}>
        <ListItem
          onPress={() => addNewAccount()}
          leading={
            <View style={styles.icon}>
              <Icon name="add" size={20} color={Colors.primary} />
            </View>
          }
          body={<Text style={styles.title}>Add New Account</Text>}
        />
        <ListItem
          onPress={() => {
            setVisible(true);
          }}
          leading={
            <View style={styles.icon}>
              <Icon name="system-update-alt" size={20} color={Colors.primary} />
            </View>
          }
          body={<Text style={styles.title}>Import Account</Text>}
        />
      </View>
      <ImportWalletDialog visible={visible} setVisible={setVisible} />
    </View>
  );
};

export default AccountsList;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  icon: {
    marginRight: 30,
    height: 35,
    width: 35,
    borderRadius: 100,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primaryDark,
    fontWeight: "600",
    fontSize: 16,
  },
  subtitle: {
    color: Colors.primaryLight,
  },
});
