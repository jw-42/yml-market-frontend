import { createSlice } from "@reduxjs/toolkit"
import { IStorageReducer } from "@shared/types";

const initialState: IStorageReducer = {}

export const storageReducer = createSlice({
  name: "storage",
  initialState,
  reducers: {}
});