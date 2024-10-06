import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStorageReducer } from "@shared/types";
import { IUploadStatus } from "@shared/types/storageReducerType";

const initialState: IStorageReducer = {}

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File>) => {
      state.currentFile = action.payload;
      state.uploadStatus = undefined;
    },
    setUploadStatus: (state, action: PayloadAction<IUploadStatus>) => {
      state.uploadStatus = action.payload;
    }
  }
});

export const {
  setFile,
  setUploadStatus
} = storageSlice.actions;

export default storageSlice.reducer;