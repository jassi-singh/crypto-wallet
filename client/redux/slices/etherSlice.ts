import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
  activeAccount: string;
  accountBalance: string;
}

const initialState = {
  activeAccount: "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  accountBalance: "0",
} as InitialState;

export const etherSlice = createSlice({
  name: "ethers",
  initialState: initialState,
  reducers: {},
});
// Action creators
export const {} = etherSlice.actions;
export default etherSlice.reducer;
