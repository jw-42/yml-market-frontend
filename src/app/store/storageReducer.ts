import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IStorageReducer } from "@shared/types";
import { XMLValidator } from "@shared/types/parser";
import { IUploadStatus } from "@shared/types/storageReducerType";

const initialState: IStorageReducer = {}

export const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File|undefined>) => {
      state.currentFile = action.payload;
      state.uploadStatus = undefined;
      state.result = undefined;
    },
    setUploadStatus: (state, action: PayloadAction<IUploadStatus>) => {
      state.uploadStatus = action.payload;
    },
    setResultData: (state, action: PayloadAction<XMLValidator|undefined>) => {
      state.result = action.payload;
    }
  }
});

export const {
  setFile,
  setUploadStatus,
  setResultData
} = storageSlice.actions;

export default storageSlice.reducer;