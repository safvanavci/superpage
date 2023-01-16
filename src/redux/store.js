import { configureStore } from "@reduxjs/toolkit";
import slicesReducer from "./slices";

export default configureStore({
  reducer: {
    slices: slicesReducer,
  },
});
