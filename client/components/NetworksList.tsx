import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NetworkInterface } from "../utils/interfaces";
import ListItem from "./ListItem";
import { changeActiveNetwork } from "../redux/slices/etherSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../utils/colors";
import Helpers from "../utils/helper";
import { RootState } from "../redux/store";

const NetworksList = () => {
  const dispatch = useDispatch();
  const networks: Array<NetworkInterface> = [
    {
      key: "1",
      name: "Mainnet",
      isCurrentNetwork: true,
      chainId: 1,
      RpcUrl: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
      currencySymbol: "ETH",
    },
    {
      key: "2",
      name: "Ropsten",
      isCurrentNetwork: false,
      chainId: 3,
      RpcUrl: "https://ropsten.infura.io/v3/YOUR_PROJECT_ID",
      currencySymbol: "ETH",
    },
    {
      key: "3",
      name: "Kovan",
      isCurrentNetwork: false,
      chainId: 42,
      RpcUrl: "https://kovan.infura.io/v3/YOUR_PROJECT_ID",
      currencySymbol: "ETH",
    },
    {
      key: "4",
      name: "Rinkeby",
      isCurrentNetwork: false,
      chainId: 4,
      RpcUrl: "https://rinkeby.infura.io/v3/YOUR_PROJECT_ID",
      currencySymbol: "ETH",
    },
    {
      key: "5",
      name: "Goerli",
      isCurrentNetwork: false,
      chainId: 5,
      RpcUrl: "https://goerli.infura.io/v3/YOUR_PROJECT_ID",
      currencySymbol: "ETH",
    },
  ];
  const ethersState = useSelector((state: RootState) => state.ethers);
  return (
    <FlatList
      data={networks}
      contentInsetAdjustmentBehavior="automatic"
      ListFooterComponent={<View style={{ height: 300 }} />}
      renderItem={({ item }) => (
        <ListItem
          onPress={() => {
            dispatch(changeActiveNetwork(item));
          }}
          leading={
            <View style={styles.icon}>
              <Icon name={"circle"} color={Helpers.stringToColor(item.name)} />
            </View>
          }
          body={<Text style={styles.title}>{item.name}</Text>}
          trailing={
            item.chainId === ethersState.activeNetwork.chainId ? (
              <View>
                <Icon name="check-circle" size={24} color={Colors.primary} />
              </View>
            ) : undefined
          }
        />
      )}
    />
  );
};

export default NetworksList;

const styles = StyleSheet.create({
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
