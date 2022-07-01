import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { BigNumber, BigNumberish, ethers, Wallet } from "ethers";
import { RootState } from "../store";
import { InitialStateAccount, NetworkInterface } from "../../utils/interfaces";
import Helpers from "../../utils/helper";
import { ACCOUNTS_LENGTH } from "../../utils/constants";

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
};

export const getBalance = createAsyncThunk(
  "getBalance",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const balanceOf = new Map<string, BigNumber>();
    const promises: Array<Promise<void>> = [];

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getBalance.fulfilled,
        (state, action: PayloadAction<Map<string, BigNumber>>) => {
          console.log("SUCCESS 🟢", action.payload);
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
} = etherSlice.actions;
export default etherSlice.reducer;
