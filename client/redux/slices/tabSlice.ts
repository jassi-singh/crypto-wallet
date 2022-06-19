import { PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../../utils/enums";

const initialState = {
  activeTab: Tab.assets,
} as TabState;

import { createSlice } from "@reduxjs/toolkit";
import { changeActiveAccount, changeActiveNetwork } from "./etherSlice";
import { TabState } from "../../utils/interfaces";
export const tabSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    changeActiveTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeActiveAccount, (state) => {
        state.activeTab = Tab.assets;
      })
      .addCase(changeActiveNetwork, (state) => {
        state.activeTab = Tab.assets;
      });
  },
});
// Action creators
export const { changeActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
