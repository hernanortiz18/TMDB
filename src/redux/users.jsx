import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");

const initialState = {
  id: null,
  name: "",
  lastName: "",
  email: "",
};

export const userReducer = createReducer(initialState, {
  [setUser]: (state, action) => {
    return action.payload;
  },
});
