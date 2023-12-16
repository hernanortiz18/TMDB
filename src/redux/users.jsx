import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {};

export const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
});
