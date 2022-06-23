import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Jazzicon } from "react-native-jazzicon/Jazzicon";
import IconButton from "./IconButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../redux/slices/tabSlice";
import { DrawerStatus, Tab } from "../utils/enums";
import { AppDispatch, RootState } from "../redux/store";
import Helpers from "../utils/helper";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeAccount = useSelector(
    (state: RootState) => state.ethers.activeAccount
  );
  const drawerStatus = useSelector(
    (state: RootState) => state.tabs.drawerStatus
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Jazzicon and account address */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            dispatch(toggleDrawer(DrawerStatus.account));
          }}
          style={styles.jazzicon}
        >
          <Jazzicon size={30} address={activeAccount?.address} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={async () => {
            await Helpers.copyToClipboard(activeAccount!.address);
          }}
        >
          <Text style={styles.text}>
            {activeAccount?.address.substring(0, 6)}...
            {activeAccount?.address.substring(37)}
          </Text>
          <Icon name="content-copy" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Menu and network button */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => {
            dispatch(toggleDrawer(DrawerStatus.network));
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
          iconName={drawerStatus !== DrawerStatus.closed ? "close" : "menu"}
          size={25}
          color="#fff"
          onPress={() => {
            drawerStatus !== DrawerStatus.closed
              ? dispatch(toggleDrawer(DrawerStatus.closed))
              : undefined;
          }}
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
    paddingHorizontal: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
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
