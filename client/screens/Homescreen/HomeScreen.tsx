import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenTemplate from "../../components/ScreenTemplate";
import BottomButtons from "../../components/BottomButtons";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/interfaces";
import { Colors } from "../../utils/colors";
import Balance from "./components/Balance";
import TabView from "./components/TabView";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScreenTemplate>
      <Balance />
      <TabView />
      <BottomButtons>
        <Button
          onPress={() => {}}
          title="Deposit"
          buttonStyles={styles.buttonDeposit}
          textStyle={styles.textDeposit}
        />
        <Button
          onPress={() => {
            navigation.navigate("SendScreen");
          }}
          title="Send"
          buttonStyles={styles.buttonTransfer}
          textStyle={styles.textTransfer}
        />
      </BottomButtons>
    </ScreenTemplate>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
