import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../../../utils/colors";
import ListItem from "../../../components/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const History = () => {
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

  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    const provider = state.ethers.provider;
  
  }, []);

  return (
    <FlatList
      data={transactionHistory}
      style={{ height: "100%" }}
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
};

export default History;

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
  status: {
    color: Colors.white,
    padding: 2,
    fontSize: 12,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
});
