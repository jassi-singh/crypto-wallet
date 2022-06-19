import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tab } from "../../../utils/enums";
import { Colors } from "../../../constants/colors";
import ListItem from "../../../components/ListItem";
import Jazzicon from "react-native-jazzicon";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  changeActiveAccount,
  changeActiveNetwork,
} from "../../../redux/slices/etherSlice";
import { NetworkInterface } from "../../../utils/interfaces";

const BottomLayout = () => {
  const dispatch = useDispatch();
  const assets = [
    { key: "1", token: "ETH", amount: 0.234, value: 373.33 },
    { key: "2", token: "BTC", amount: 0.234, value: 373.33 },
    { key: "3", token: "LTC", amount: 0.234, value: 373.33 },
    { key: "4", token: "XRP", amount: 0.234, value: 373.33 },
    { key: "5", token: "BCH", amount: 0.234, value: 373.33 },
    { key: "6", token: "EOS", amount: 0.234, value: 373.33 },
    { key: "7", token: "XLM", amount: 0.234, value: 373.33 },
    { key: "8", token: "ADA", amount: 0.234, value: 373.33 },
    { key: "9", token: "TRX", amount: 0.234, value: 373.33 },
    { key: "10", token: "NEO", amount: 0.234, value: 373.33 },
    { key: "11", token: "XMR", amount: 0.234, value: 373.33 },
    { key: "12", token: "IOTA", amount: 0.234, value: 373.33 },
    { key: "13", token: "XVG", amount: 0.234, value: 373.33 },
    { key: "14", token: "ETC", amount: 0.234, value: 373.33 },
  ];

  const transactionHistory = [
    {
      key: "1",
      status: "Success",
      date: "12/12/2019",
      amount: "0.234",
      token: "ETH",
      description: "Contract Interaction",
    },
    {
      key: "2",
      status: "Pending",
      date: "12/12/2019",
      amount: "0.234",
      token: "ETH",
      description: "Contract Interaction",
    },
    {
      key: "3",
      status: "Failed",
      date: "12/12/2019",
      amount: "0.234",
      token: "ETH",
      description: "Contract Interaction",
    },
  ];

  const accounts = [
    {
      key: "1",
      address: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
      balance: "0.234",
      name: "Address 1",
      isCurrentAccount: false,
    },
    {
      key: "2",
      address: "0xea4f8f9f8f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f",
      balance: "0.234",
      name: "Address 2",
      isCurrentAccount: true,
    },
    {
      key: "3",
      address: "0x94ac5f8f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9f9",
      balance: "0.234",
      name: "Address 3",
      isCurrentAccount: false,
    },
  ];

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

  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);
  const activeAccount = useSelector(
    (state: RootState) => state.ethers.activeAccount
  );
  const activeNetwork = useSelector(
    (state: RootState) => state.ethers.activeNetwork
  );
  const showList = (tab: Tab) => {
    switch (tab) {
      case Tab.networks:
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
                    <Icon
                      name={"circle"}
                      color={"#" + (334 * item.chainId).toString(16)}
                    />
                  </View>
                }
                body={<Text style={styles.title}>{item.name}</Text>}
                trailing={
                  item.chainId === activeNetwork.chainId ? (
                    <View>
                      <Icon
                        name="check-circle"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  ) : undefined
                }
              />
            )}
          />
        );

      case Tab.accounts:
        return (
          <FlatList
            data={accounts}
            contentInsetAdjustmentBehavior="automatic"
            ListFooterComponent={<View style={{ height: 300 }} />}
            renderItem={({ item }) => (
              <ListItem
                onPress={() => {
                  dispatch(changeActiveAccount(item.address));
                }}
                leading={
                  <View style={styles.icon}>
                    <Jazzicon size={30} address={item.address} />
                  </View>
                }
                body={
                  <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>{item.balance} ETH</Text>
                  </View>
                }
                trailing={
                  item.address === activeAccount ? (
                    <View>
                      <Icon
                        name="check-circle"
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  ) : undefined
                }
              />
            )}
          />
        );

      case Tab.assets:
        return (
          <FlatList
            data={assets}
            contentInsetAdjustmentBehavior="automatic"
            ListFooterComponent={<View style={{ height: 300 }} />}
            renderItem={({ item }) => (
              <ListItem
                leading={
                  <View style={styles.icon}>
                    <Text>{item.token[0]}</Text>
                  </View>
                }
                body={
                  <View>
                    <Text style={styles.title}>
                      {item.amount} {item.token}
                    </Text>
                    <Text style={styles.subtitle}>${item.value}</Text>
                  </View>
                }
              />
            )}
          />
        );
      case Tab.history:
        return (
          <FlatList
            data={transactionHistory}
            renderItem={({ item }) => (
              <ListItem
                leading={
                  <View style={styles.icon}>
                    <Text>{item.token[0]}</Text>
                  </View>
                }
                body={
                  <View>
                    <Text style={styles.title}>{item.description}</Text>
                    <View style={styles.row}>
                      <Text
                        style={[
                          styles.status,
                          {
                            backgroundColor:
                              item.status.toLowerCase() === "success"
                                ? Colors.success
                                : item.status.toLowerCase() === "pending"
                                ? Colors.pending
                                : Colors.failed,
                          },
                        ]}
                      >
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                }
                trailing={
                  <Text>
                    - {item.amount} {item.token}
                  </Text>
                }
              />
            )}
          />
        );
      case Tab.transfer:
        return <ScrollView>
          <Text>Send To</Text>
        </ScrollView>;
      default:
        return (
          <FlatList
            data={assets}
            contentInsetAdjustmentBehavior="automatic"
            ListFooterComponent={<View style={{ height: 300 }} />}
            renderItem={({ item }) => (
              <ListItem
                leading={
                  <View style={styles.icon}>
                    <Text>{item.token[0]}</Text>
                  </View>
                }
                body={
                  <View>
                    <Text style={styles.title}>
                      {item.amount} {item.token}
                    </Text>
                    <Text style={styles.subtitle}>${item.value}</Text>
                  </View>
                }
              />
            )}
          />
        );
    }
  };
  return <View style={styles.container}>{showList(activeTab)}</View>;
};

export default BottomLayout;

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
  status: {
    color: Colors.white,
    padding: 2,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
});
