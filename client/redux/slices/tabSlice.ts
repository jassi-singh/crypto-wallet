import { PayloadAction } from "@reduxjs/toolkit";
import { DrawerStatus, Tab } from "../../utils/enums";
import { createSlice } from "@reduxjs/toolkit";
import { TabState } from "../../utils/interfaces";

const initialState: TabState = {
  activeTab: Tab.assets,
  drawerStatus: DrawerStatus.closed,
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState: initialState,
  reducers: {
    changeActiveTab: (state, action: PayloadAction<Tab>) => {
      state.activeTab = action.payload;
    },
    toggleDrawer: (state, action: PayloadAction<DrawerStatus>) => {
      if (state.drawerStatus !== action.payload)
        state.drawerStatus = action.payload;
      else state.drawerStatus = DrawerStatus.closed;
    },
  },
});
// Action creators
export const { changeActiveTab, toggleDrawer } = tabSlice.actions;
export default tabSlice.reducer;
