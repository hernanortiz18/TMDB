import { createAction, createReducer } from "@reduxjs/toolkit";

export const setRecover = createAction("SET_RECOVER");

const initialState = "";

export const recoverReducer = createReducer(initialState, {
  [setRecover]: (state, action) => {
    return action.payload;
  },
});
