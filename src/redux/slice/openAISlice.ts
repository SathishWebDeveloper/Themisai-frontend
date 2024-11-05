/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { createDocumentsSummary } from "../service/openAIService";

interface InitialState {
  loading: boolean;
  errorMessage: string;
  summaryInfo: null | any;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: "",
  summaryInfo: null,
};

export const openAI = createSlice({
  name: "openAI",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDocumentsSummary.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(createDocumentsSummary.fulfilled, (state, action: any) => {
        state.loading = false;
        state.summaryInfo = action.payload;
        state.errorMessage = "";
      })
      .addCase(createDocumentsSummary.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { reset } = openAI.actions;

export default openAI.reducer;
