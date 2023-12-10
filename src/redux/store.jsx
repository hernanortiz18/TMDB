import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./users";
import { loadingReducer } from "./loading";

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
  },
});

export default store;
