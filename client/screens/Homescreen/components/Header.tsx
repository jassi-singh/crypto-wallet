import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Jazzicon } from "react-native-jazzicon/Jazzicon";
import IconButton from "../../../components/IconButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveTab } from "../../../redux/slices/tabSlice";
import { Tab } from "../../../utils/enums";
import { RootState } from "../../../redux/store";
// import "react-native-get-random-values";
// import "@ethersproject/shims";
// import { ethers } from "ethers";

const Header = () => {
  const dispatch = useDispatch();
  const activeAccount = useSelector(
    (state: RootState) => state.ethers.activeAccount
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Jazzicon and account address */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            dispatch(changeActiveTab(Tab.accounts));
          }}
          style={styles.jazzicon}
        >
          <Jazzicon size={30} address={activeAccount} />
        </TouchableOpacity>
        <Text style={styles.text}>
          {activeAccount.substring(0, 6)}...{activeAccount.substring(37)}
        </Text>
      </View>

      {/* Menu and network button */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            dispatch(changeActiveTab(Tab.networks));
          }}
        >
          <Icon name="language" size={25} color="#fff" />
          <Icon
            style={styles.networkDot}
            name="circle"
            color="#6EC67A"
            size={13}
          />
        </TouchableOpacity>
        <IconButton
          style={{ paddingLeft: 20 }}
          iconName="menu"
          size={25}
          color="#fff"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    paddingLeft: 10,
    color: Colors.white,
    fontWeight: "600",
  },
  jazzicon: {
    padding: 3,
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  networkDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
