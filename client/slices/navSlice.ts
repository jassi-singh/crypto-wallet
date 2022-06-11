import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface NavState {
  origin: any;
  destination: any;
  travelTimeInformation: any;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    origin: (state, action) => {
      state.origin = action.payload;
    },
    destination: (state, action) => {
      state.destination = action.payload;
    },
    travelTimeInformation: (state, action: PayloadAction<any>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { origin, destination, travelTimeInformation } = navSlice.actions;

// Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.origin;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.origin;
export default navSlice.reducer;
