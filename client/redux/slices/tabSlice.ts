import { PayloadAction } from "@reduxjs/toolkit";
import { Tab } from "../../utils/enums";

interface TabState {
  activeTab: Tab;
}

const initialState = {
  activeTab: Tab.assets,
} as TabState;

import { createSlice } from "@reduxjs/toolkit";
export const tabSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    changeActiveTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
  },
});
// Action creators
export const { changeActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
