import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./slices/tabSlice";
import etherReducer from "./slices/etherSlice";

export const store = configureStore({
  reducer: {
    tabs: tabReducer,
    ethers: etherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
