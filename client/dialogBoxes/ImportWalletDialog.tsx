import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Dialog from "react-native-dialog";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { ethers } from "ethers";
import { addWallet } from "../redux/slices/etherSlice";

const ImportWalletDialog = (props: {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { visible, setVisible } = props;
  const [privateKey, setPrivateKey] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const importAccount = (privateKey: string) => {
    const wallet = new ethers.Wallet(privateKey);
    dispatch(addWallet(wallet));
  };
  return (
    <Dialog.Container visible={visible}>
      <Dialog.Title>Import Account</Dialog.Title>
      <Dialog.Description>
        Imported accounts will not be associated with your originally created
        MetaMask account Secret Recovery Phrase.
      </Dialog.Description>
      <Dialog.Input
        value={privateKey}
        placeholder="Enter Private Key"
        onChangeText={setPrivateKey}
      ></Dialog.Input>
      <Dialog.Button
        label="Cancel"
        onPress={() => {
          setVisible(false);
          setPrivateKey("");
        }}
      />
      <Dialog.Button
        label="Import"
        onPress={() => {
          importAccount(privateKey);
          setVisible(false);
          setPrivateKey("");
        }}
      />
    </Dialog.Container>
  );
};

export default ImportWalletDialog;

const styles = StyleSheet.create({});
