import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ListItem from "../../../components/ListItem";
import { Colors } from "../../../utils/colors";

const Assets = () => {
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

  return (
    <FlatList
      data={assets}
      contentInset={{ bottom: 100 }}
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
};

export default Assets;

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
