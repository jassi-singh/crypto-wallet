import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TopLayout from "./components/TopLayout";
import BottomLayout from "./components/BottomLayout";
import { Colors } from "../../constants/colors";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { changeActiveTab } from "../../redux/slices/tabSlice";
import { Tab } from "../../utils/enums";

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <TopLayout />
      <BottomLayout />
      <View style={styles.floatingButtons}>
        <Button
          onPress={() => {}}
          title="Deposit"
          buttonStyles={styles.buttonDeposit}
          textStyle={styles.textDeposit}
        />
        <Button
          onPress={() => {
            dispatch(changeActiveTab(Tab.transfer));
          }}
          title="Send"
          buttonStyles={styles.buttonTransfer}
          textStyle={styles.textTransfer}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    height: "100%",
    display: "flex",
    backgroundColor: Colors.white,
  },
  floatingButtons: {
    position: "absolute",
    bottom: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonTransfer: {
    backgroundColor: Colors.primary,
    flexGrow: 1,
  },
  buttonDeposit: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  textTransfer: {
    color: Colors.white,
  },
  textDeposit: {
    color: Colors.primary,
  },
});
