import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ListItemToken from "../../../components/ListItemToken";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Tab } from "../../../utils/enums";

const BottomLayout = () => {
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
      status: "Success",
      date: "12/12/2019",
      amount: "0.234",
      token: "ETH",
      description: "Contract Interaction",
    },
  ];

  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  return (
    <View style={styles.container}>
      {activeTab === Tab.assets ? (
        <FlatList
          data={assets}
          contentInset={{ top: 0, bottom: 300 }}
          renderItem={({ item }) => (
            <ListItemToken
              icon={item.token[0]}
              title={`${item.amount} ${item.token}`}
              subtitle={`$${item.value}`}
            />
          )}
        />
      ) : (
        <FlatList
          data={transactionHistory}
          renderItem={({ item }) => (
            <ListItemToken
              icon={item.token[0]}
              title={`${item.description}`}
              subtitle={`$${item.status}`}
            />
          )}
        />
      )}
    </View>
  );
};

export default BottomLayout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 5,
  },
});
