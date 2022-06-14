import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Jazzicon } from "react-native-jazzicon/Jazzicon";
import IconButton from "../../../components/IconButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../../constants/colors";
// import "react-native-get-random-values";
// import "@ethersproject/shims";
// import { ethers } from "ethers";

type HeaderInterface = {
  address: string;
};

const Header = (props: HeaderInterface) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Jazzicon and account address */}
      <View style={styles.row}>
        <View style={styles.jazzicon}>
          <Jazzicon size={30} address={props.address} />
        </View>
        <Text style={styles.text}>
          {props.address.substring(0, 6)}...{props.address.substring(37)}
        </Text>
      </View>

      {/* Menu and network button */}
      <View style={styles.row}>
        <View>
          <IconButton
            iconName="language"
            size={25}
            color="#fff"
            onPress={() => {}}
          />
          <Icon
            style={styles.networkDot}
            name="circle"
            color="#6EC67A"
            size={13}
          />
        </View>
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
