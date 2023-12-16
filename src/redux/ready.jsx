import { createAction, createReducer } from "@reduxjs/toolkit";

export const setReady = createAction("SET_READY");

const initialState = false;

export const readyReducer = createReducer(initialState, {
  [setReady]: (state, action) => {
    return action.payload;
  },
});
