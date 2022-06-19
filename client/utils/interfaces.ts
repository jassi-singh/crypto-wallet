import { ReactElement } from "react";
import { GestureResponderEvent } from "react-native";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Tab } from "./enums";

export type RootStackParamList = {
  Home: undefined;
  Startup: undefined;
  CreateAccount: undefined;
  ConfirmSeedPhrase: ConfirmSeedPhraseParams;
};

export interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonStyles?: Object;
  textStyle?: Object;
  disabled?: boolean;
}

export interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  iconName: string;
  size: number;
  color: string;
  style?: any;
}

export interface TabButtonProps {
  tab: Tab;
}

export interface ListItemProps {
  leading?: ReactElement;
  body: ReactElement;
  trailing?: ReactElement;
  onPress?: (event: GestureResponderEvent) => void;
}

export interface InitialStateAccount {
  provider: JsonRpcProvider;
  activeAccount: string;
  accountBalance: string;
  activeNetwork: NetworkInterface;
}
export interface NetworkInterface {
  key: string;
  name: string;
  isCurrentNetwork: boolean;
  chainId: number;
  RpcUrl: string;
  currencySymbol: string;
}

export interface TabState {
  activeTab: Tab;
}

export interface SeedPhraseInput {
  text: string;
  index?: number;
  onPress?: (event: GestureResponderEvent) => void;
  used?: boolean;
}

export interface ConfirmSeedPhraseParams {
  seedPhrase: string;
}
