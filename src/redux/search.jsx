import { createAction, createReducer } from "@reduxjs/toolkit";

export const setSearchResult = createAction("SET_SEARCH");

const initialState = [];

export const searchReducer = createReducer(initialState, {
  [setSearchResult]: (state, action) => {
    return action.payload;
  },
});
