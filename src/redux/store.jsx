import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./users";
import { loadingReducer } from "./loading";
import { searchReducer } from "./search";
import { readyReducer } from "./ready";

const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    searchResult: searchReducer,
    ready: readyReducer,
  },
});

export default store;
