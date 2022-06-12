import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Jazzicon } from "react-native-jazzicon/Jazzicon";
import tw from "tailwind-react-native-classnames";
// import "react-native-get-random-values";
// import "@ethersproject/shims";
// import { ethers } from "ethers";

type HeaderInterface = {
  address: string;
};

const Header = (props: HeaderInterface) => {
  return (
    <View style={styles.container}>
      <View>
        <Jazzicon size={45} address={props.address} />
      </View>
      <Text style={styles.text}>
        {props.address.substring(0, 6)}...{props.address.substring(37)}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: tw`py-5 flex flex-row items-center`,
  text: tw`pl-2 font-semibold text-white`,
});
