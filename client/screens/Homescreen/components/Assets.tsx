import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ListItem from "../../../components/ListItem";
import { Colors } from "../../../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../utils/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Contract, ethers } from "ethers";
import { ERC20_ABI } from "../../../utils/constants";
import Jazzicon from "react-native-jazzicon";

const Assets = () => {
  const state = useSelector((state: RootState) => state);
  const assets = state.ethers.importedTokens
    .filter((asset) => asset.account === state.ethers.activeAccount?.address)
    .map(
      (asset) =>
        new ethers.Contract(
          asset.tokenAddress,
          ERC20_ABI,
          state.ethers.activeAccount
        )
    );
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        ListFooterComponent={<View style={{ height: 150 }}></View>}
        renderItem={({ item }) => <Token token={item} />}
      />
      <View style={{ marginBottom: 150 }}>
        <ListItem
          onPress={() => navigation.navigate("ImportToken")}
          leading={
            <View style={styles.icon}>
              <Icon name="add" size={20} color={Colors.primary} />
            </View>
          }
          body={<Text style={styles.title}>Add New Token</Text>}
        />
      </View>
    </View>
  );
};

export default Assets;

function Token(props: { token: Contract }) {
  const tokenContract = props.token;
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const state = useSelector((state: RootState) => state);
  const getSymbol = async () => {
    setSymbol(await tokenContract.symbol());
  };

  const getAmount = async () => {
    setAmount(
      ethers.utils.formatEther(
        await tokenContract.balanceOf(state.ethers.activeAccount?.address)
      )
    );
  };

  useEffect(() => {
    getSymbol();
    getAmount();
  }, [state.ethers.activeAccount?.address]);

  return (
    <ListItem
      leading={
        <View style={styles.icon}>
          <Jazzicon size={30} address={tokenContract.address} />
        </View>
      }
      body={
        <View>
          <Text style={styles.title}>
            {amount} {symbol}
          </Text>
          {/* <Text style={styles.subtitle}></Text> */}
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
