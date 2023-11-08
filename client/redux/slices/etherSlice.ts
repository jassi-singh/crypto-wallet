import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { BigNumber, BigNumberish, Contract, ethers, Wallet } from "ethers";
import { RootState } from "../store";
import {
  ImportedToken,
  InitialStateAccount,
  NetworkInterface,
} from "../../utils/interfaces";
import Helpers from "../../utils/helper";
import { ACCOUNTS_LENGTH, IMPORTED_TOKENS } from "../../utils/constants";

const initialState: InitialStateAccount = {
  provider: new ethers.providers.JsonRpcProvider(),
  activeAccount: undefined,
  balanceOf: new Map<string, BigNumberish>(),
  activeNetwork: {
    key: "1",
    name: "Mainnet",
    isCurrentNetwork: true,
    chainId: 1,
    RpcUrl: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
    currencySymbol: "ETH",
  },
  wallets: [],
  importedTokens: [],
};

export const getBalance = createAsyncThunk(
  "getBalance",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const balanceOf = new Map<string, BigNumber>();
    const promises: Array<Promise<void>> = [];
    state.ethers.provider.getNetwork().then((network) => console.log(network));
    state.ethers.provider
      .getBalance("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
      .then((balance) => console.log(ethers.utils.formatEther(balance)));
    state.ethers.wallets.forEach((wallet) => {
      const promise = state.ethers.provider
        .getBalance(wallet.address)
        .then((balance) => {
          balanceOf.set(wallet.address, balance);
        });
      promises.push(promise);
    });
    await Promise.all(promises);
    return balanceOf;
  }
);

export const etherSlice = createSlice({
  name: "ethers",
  initialState: initialState,
  reducers: {
    changeActiveAccount: (state, action: PayloadAction<Wallet>) => {
      state.activeAccount = action.payload.connect(state.provider);
    },
    changeActiveNetwork: (state, action: PayloadAction<NetworkInterface>) => {
      state.activeNetwork = action.payload;
    },
    addWallet: (state, action: PayloadAction<Wallet>) => {
      state.wallets.push(action.payload);
      Helpers.storeData(ACCOUNTS_LENGTH, state.wallets.length.toString());
    },
    removeWallet: (state) => {
      state.wallets.length = 0;
    },
    addNewToken: (state, action: PayloadAction<ImportedToken>) => {
      state.importedTokens.push(action.payload);
      Helpers.storeData(IMPORTED_TOKENS, JSON.stringify(state.importedTokens));
    },
    setImportedTokens: (state, action: PayloadAction<Array<ImportedToken>>) => {
      state.importedTokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBalance.fulfilled,
        (state, action: PayloadAction<Map<string, BigNumber>>) => {
          console.log("SUCCESS 🟢", action.payload);
          action.payload.forEach((value, key) => {
            console.log("key", key);
            console.log("value", ethers.utils.formatEther(value));
          });
          state.balanceOf = action.payload;
        }
      )
      .addCase(getBalance.pending, () => {
        console.log("PENDING 🟠");
      })
      .addCase(getBalance.rejected, () => {
        console.log("ERRRO 🔴");
      });
  },
});
// Action creators
export const {
  changeActiveAccount,
  changeActiveNetwork,
  addWallet,
  removeWallet,
  addNewToken,
  setImportedTokens,
} = etherSlice.actions;
export default etherSlice.reducer;
