import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { ethers } from "ethers";
import { RootState } from "../store";
import { InitialStateAccount, NetworkInterface } from "../../utils/interfaces";

const initialState: InitialStateAccount = {
  provider: new ethers.providers.JsonRpcProvider(),
  activeAccount: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  accountBalance: "0",
  activeNetwork: {
    key: "1",
    name: "Mainnet",
    isCurrentNetwork: true,
    chainId: 1,
    RpcUrl: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
    currencySymbol: "ETH",
  },
};

export const getBalance = createAsyncThunk(
  "getBalance",
  async (_, { getState }) => {
    const state = getState() as RootState;
    console.log(state.ethers.activeAccount);
    const provider = state.ethers.provider;
    const bigNum = await provider.getBalance(state.ethers.activeAccount);
    const balance = ethers.utils.formatEther(bigNum);
    console.log(balance);
    return balance;
  }
);

export const etherSlice = createSlice({
  name: "ethers",
  initialState: initialState,
  reducers: {
    changeActiveAccount: (state, action: PayloadAction<string>) => {
      state.activeAccount = action.payload;
    },
    changeActiveNetwork: (state, action: PayloadAction<NetworkInterface>) => {
      state.activeNetwork = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getBalance.fulfilled,
      (state, action: PayloadAction<string>) => {
        console.log("SUCCESS", action.payload);
        state.accountBalance = action.payload;
      }
    );
    builder.addCase(getBalance.pending, () => {
      console.log("PENDING.....");
    });
    builder.addCase(getBalance.rejected, () => {
      console.log("ERRRO!!!");
    });
  },
});
// Action creators
export const { changeActiveAccount, changeActiveNetwork } = etherSlice.actions;
export default etherSlice.reducer;
