import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../../utils/colors";
import ListItem from "../../../components/ListItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ethers } from "ethers";
import Helpers from "../../../utils/helper";
import { ERC20_ABI, TRANSACTION_HISTORY } from "../../../utils/constants";

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState<
    Array<ethers.providers.TransactionResponse>
  >([]);

  const state = useSelector((state: RootState) => state);

  const getTransactionHistory = async () => {
    const transactionHistoryCache = await Helpers.getData(TRANSACTION_HISTORY);
    console.log(JSON.parse(transactionHistoryCache!));
    setTransactionHistory(JSON.parse(transactionHistoryCache!));
  };

  const getAmountPaid = (tx: ethers.providers.TransactionResponse) => {
    if (tx.data == "0x") return ethers.utils.formatEther(tx.value) + " ETH";
    else
      return (
        ethers.utils.formatEther(
          new ethers.utils.Interface(ERC20_ABI).decodeFunctionData(
            "transfer",
            tx.data
          )[1]
        ) + " LINK"
      );
  };

  useEffect(() => {
    getTransactionHistory();
  }, []);

  return (
    <FlatList
      data={transactionHistory}
      style={{ height: "100%" }}
      ListFooterComponent={<View style={{ height: 150 }}></View>}
      renderItem={({ item }) => {
        if (item.data !== "0x")
          console.log(
            ethers.utils.formatEther(
              new ethers.utils.Interface(ERC20_ABI).decodeFunctionData(
                "transfer",
                item.data
              )[1]
            )
          );
        return (
          <ListItem
            leading={
              <View style={styles.icon}>
                <Text>{"s"}</Text>
              </View>
            }
            body={
              <View>
                <Text style={styles.title}>{item.type}</Text>
                <View style={styles.row}>
                  <Text
                    style={[
                      styles.status,
                      // {
                      //   backgroundColor:
                      //     item.status.toLowerCase() === "success"
                      //       ? Colors.success
                      //       : item.status.toLowerCase() === "pending"
                      //       ? Colors.pending
                      //       : Colors.failed,
                      // },
                    ]}
                  >
                    {item.data !== "0x"
                      ? ethers.utils.formatEther(
                          new ethers.utils.Interface(
                            ERC20_ABI
                          ).decodeFunctionData("transfer", item.data)[1]
                        )
                      : "j"}
                  </Text>
                </View>
              </View>
            }
            trailing={<Text>- {getAmountPaid(item)}</Text>}
          />
        );
      }}
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
