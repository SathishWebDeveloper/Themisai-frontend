/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import {
  createMatters,
  fetchMattersDetails,
  fetchMattersForUser,
} from "src/redux/service/mattersService";

interface InitialState {
  //   token: string | null;
  loading: boolean;
  errorMessage: string;
  successMessage:string;
  isAuth: boolean;
  mattersInfo: null | any;
  mattersDetailInfo: null | any;
}

const initialState: InitialState = {
  //   token: "",
  loading: false,
  errorMessage: "",
  successMessage:"",
  isAuth: false,
  mattersInfo: null,
  mattersDetailInfo: null,
};

export const matters = createSlice({
  name: "matters",
  initialState,
  reducers: {
    // tokenGenerate: (state: InitialState, action: PayloadAction<any>) => {
    //   state.token = action.payload;
    // },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMattersForUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(fetchMattersForUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.mattersInfo = action.payload;
        state.isAuth = true;
        state.errorMessage = "";
      })
      .addCase(fetchMattersForUser.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(fetchMattersDetails.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(fetchMattersDetails.fulfilled, (state, action: any) => {
        state.loading = false;
        state.mattersDetailInfo = action.payload;
        state.isAuth = true;
        state.errorMessage = "";
      })
      .addCase(fetchMattersDetails.rejected, (state, action: any) => {
        state.loading = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(createMatters.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMatters.fulfilled, (state) => {
        state.loading = false;
        state.successMessage = "Matter created successfully";
      })
      .addCase(createMatters.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { reset } = matters.actions;

export default matters.reducer;
