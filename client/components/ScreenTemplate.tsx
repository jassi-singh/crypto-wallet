import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import Drawer from "react-native-drawer";
import AccountsList from "./AccountsList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { DrawerStatus } from "../utils/enums";
import NetworksList from "./NetworksList";

const ScreenTemplate = (props: { children: ReactNode }) => {
  const drawerStatus = useSelector(
    (state: RootState) => state.tabs.drawerStatus
  );
  return (
    <Drawer
      type="overlay"
      open={drawerStatus != DrawerStatus.closed}
      content={
        drawerStatus === DrawerStatus.account ? (
          <AccountsList />
        ) : drawerStatus === DrawerStatus.network ? (
          <NetworksList />
        ) : null
      }
      styles={{
        mainOverlay: {
          backgroundColor:
            drawerStatus != DrawerStatus.closed ? "white" : "transparent",
        },
      }}
    >
      <View style={{ height: "100%" }}>{props.children}</View>
    </Drawer>
  );
};

export default ScreenTemplate;
