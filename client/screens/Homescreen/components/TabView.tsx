import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TabButton from "../../../components/TabButton";
import { Tab } from "../../../utils/enums";
import { Colors } from "../../../utils/colors";
import ListItem from "../../../components/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const TabView = () => {
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

  const activeTab = useSelector((state: RootState) => state.tabs.activeTab);

  const showList = (tab: Tab) => {
    switch (tab) {
      case Tab.assets:
        return (
          <FlatList
            data={assets}
            contentInsetAdjustmentBehavior="automatic"
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
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.tabButtons, styles.row]}>
        <TabButton tab={Tab.assets} />
        <TabButton tab={Tab.history} />
      </View>
      <View style={styles.tabView}>{showList(activeTab)}</View>
    </View>
  );
};

export default TabView;

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
    flexDirection: "row",
  },
  tabButtons: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
  },
  tabView: {
    paddingBottom: 300,
    backgroundColor: Colors.white,
  },
});
