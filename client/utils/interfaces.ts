import { ReactElement } from "react";
import { GestureResponderEvent } from "react-native";
import { JsonRpcProvider } from "@ethersproject/providers";
import { DrawerStatus, Tab } from "./enums";
import { BigNumber, BigNumberish, Wallet } from "ethers";

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  Startup: undefined;
  CreateAccount: CreateAccountProps;
  ConfirmSeedPhrase: CreateAccountProps;
  EncryptWallet: undefined;
  Login: LoginScreenProps;
  SendScreen: undefined;
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
  activeAccount?: Wallet;
  balanceOf: Map<string, BigNumberish>;
  activeNetwork: NetworkInterface;
  wallets: Array<Wallet>;
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
  drawerStatus: DrawerStatus;
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

export interface MyInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconName?: string;
  onIconPress?: (event: GestureResponderEvent) => void;
  placeholder: string;
}

export interface LoginScreenProps {
  encryptedWalletJson: string;
}
export interface CreateAccountProps {
  seedPhrase: string;
}
