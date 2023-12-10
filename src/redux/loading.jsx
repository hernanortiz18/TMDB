import { createAction, createReducer } from "@reduxjs/toolkit";

export const setLoading = createAction("SET_LOADING");

const initialState = false;

export const loadingReducer = createReducer(initialState, {
  [setLoading]: (state, action) => {
    return action.payload;
  },
});
